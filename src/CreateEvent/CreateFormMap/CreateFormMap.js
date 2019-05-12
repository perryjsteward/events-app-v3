
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
        selectedPlace: null
    }

    handleScriptLoad = () => {
        // Declare Options For Autocomplete 
        var options = { }; // empty on purpose 
        
        // Initialize Google Autocomplete 
        /*global google*/
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            options 
        ); 
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
        if(place.name){
            selectedPlace = {
                address: address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }
        }
        this.setState({
            selectedPlace: selectedPlace
        });
        this.props.onSetLocation(this.state.selectedPlace);
        this.handleMapLoad();
    }

    handleMapLoad = () => {
        let lat = null;
        let lng = null;
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
        new google.maps.Marker({position: location, map: map}); 
    }

    handleUserInput = e => {}
 
    render() {
        return (
            <React.Fragment>
                <Script 
                    onLoad={this.handleScriptLoad} 
                    url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`}/>
               
                
                <div className="map__input-field">
                    <Input 
                        id="autocomplete"
                        onChange={(e) => this.handleUserInput(e)} //need to smartly remove this
                        icon="fa-search"
                        size="medium"
                        type="text"
                        isValid={true}
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