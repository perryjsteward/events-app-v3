
import React, { Component } from 'react'
import Script from 'react-load-script';
import './CreateFormMap.scss';
import Input from  '../../_shared/Input/Input';
/* global google */
// state
import * as actions from '../../_store/actions';
import { connect } from 'react-redux';

class CreateFormMap extends Component {

    state = {
        isLoading: false,
        selectedPlace: null,
        marker: null
    }

    addressInput =  React.createRef();

    componentDidMount = () => {}

    setCurrentLocation = () => {
        console.log('setting location')
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position, error) => {
                if(position) {
                    this.setState({
                        currentLng: position.coords.longitude,
                        currentLat: position.coords.latitude
                    })
                    if(this.state.hasMapLoaded) {
                        this.handleMapLoad();
                    }
                }
                if(error) {
                   console.log(error);
                }
            });
        }
    }

    handleScriptLoad = () => {
        this.setState({
            hasMapLoaded: true
        })
        // Declare Options For Autocomplete 
        var options = { }; // empty on purpose 
        
        // Initialize Google Autocomplete 
        /*global google*/
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            options 
        ); 
        this.handleMapLoad();
        // Fire Event when a suggested name is selected
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect); 
    }

    handlePlaceSelect = () => {
        let selectedPlace = {};
        const place = this.autocomplete.getPlace();
        let address = place.formatted_address;
        if(place.name) {
            address = place.name + ', ' + place.formatted_address;  
        }
        if(place.formatted_address){
            selectedPlace = {
                address: address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                name: place.name ? place.name : address
            }
            this.setState({
                selectedPlace: selectedPlace,
                value: address
            });
            this.props.onSetLocation(this.state.selectedPlace);
            this.placeMarker({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
        } else {

        }
    }

    handleMapLoad = (startLat = 51.51990, startLng = 0.151876) => {
        let lat = startLat;
        let lng = startLng;

        if(this.state.currentLng && this.state.currentLat) {
            lat = this.state.currentLat;
            lng = this.state.currentLng;
        }

        if(this.state.selectedPlace){
            lat = this.state.selectedPlace.lat; 
            lng = this.state.selectedPlace.lng;
        }
        let location = {
            lat: lat, 
            lng: lng, 
        };

        let map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 16,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
        });

        this.setState({
            map: map
        })

        if(this.state.selectedPlace){
            this.placeMarker(location, this.state.map);
        }

        map.addListener('click', (event) => {
            if(event.latLng){
                let location = {
                    lat: event.latLng.lat(), 
                    lng: event.latLng.lng(), 
                };
                this.placeMarker(location, true)
            }  
        });
    }
    
    placeMarker = (location, userClicked = false) => {
        if(this.state.marker) {
            this.state.marker.setMap(null);
        }
        if(!userClicked) {
            this.state.map.setCenter(location);
        } else {
            this.setSelectedLocation(location);
        }
        const marker = new google.maps.Marker({position: location, map: this.state.map}); 
        this.setState({
            marker: marker
        });
        this.state.marker.setMap(this.state.map);
    }

    setSelectedLocation = (location) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': location }, (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                let selectedPlace = {};
                const place = results[0];
                let address = place.formatted_address;
                if(place.name) {
                    address = place.name + ', ' + place.formatted_address;    
                }
                selectedPlace = {
                    address: address,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    name: place.name ? place.name : address
                }
                this.setState({
                    selectedPlace: selectedPlace,
                    value: address
                });
                this.props.onSetLocation(this.state.selectedPlace);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
       
    }

    clearInput = () => {
        this.setState({
            selectedPlace: null,
            value: ''
        });
        if(this.state.marker) {
            this.state.marker.setMap(null);
        };
        this.props.onSetLocation(undefined);
        this.addressInput.focus();
    }


    handleUserInput = e => {
        this.setState({
            value: e.target.value,
            hasStated: true
        });
    }
 
    render() {
        return (
            <React.Fragment>
                <Script 
                    onLoad={this.handleScriptLoad} 
                    url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`}/>
                   
                <div className="map__input-field">
                    <Input 
                        id="autocomplete"
                        value={this.state.value}
                        clearInput={() => this.clearInput()}
                        ref={(input) => { this.addressInput = input; }}
                        onChange={(e) => this.handleUserInput(e)} //need to smartly remove this
                        prefix="fa-search"
                        suffix="fa-location-arrow"
                        size="medium"
                        hint='helloooo'
                        type="text"
                        suffixMethod={() => this.setCurrentLocation()}
                        isValid={false}
                        hasStarted={this.state.hasStarted}
                        placeholder="Search street address" />
                </div>
                <div id="map" className="create-form__map bg-grey-100"></div>
            </React.Fragment>
           
        )
    }
}

const mapStateToProps = state => {
    return {
        createError: state.createError,
        imageError: state.imageError,
        imagePath: state.imagePath,
        location: state.location
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onSetLocation: (location) => dispatch( actions.setSelectedLocation(location) )
    };
  };
  
  export default connect( mapStateToProps, mapDispatchToProps )(CreateFormMap);