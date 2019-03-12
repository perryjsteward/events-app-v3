
import React, { Component } from 'react'
import Script from 'react-load-script';
import './CreateFormMap.scss';
import Input from  '../../shared/Input/Input';
// /* global google */

export default class CreateFormMap extends Component {

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
        const place = this.autocomplete.getPlace();
        this.setState({
            selectedPlace: {
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            },
            isLoading: true
        });
        this.handleMapLoad();
    }

    handleMapLoad = () => {
        let location = {
            lat: this.state.selectedPlace.lat, 
            lng: this.state.selectedPlace.lng, 
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

    handleUserInput = (e) => { }
 
    render() {
        return (
            <React.Fragment>
                <Script 
                    onLoad={this.handleScriptLoad} 
                    url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBY_d1jFhjDOyMnTa4eKfPMhTqu8H8I9sQ&libraries=places'/>
                <div className="map__input-field">
                    <Input 
                        id="autocomplete"
                        onChange={(e) => this.handleUserInput(e)} //need to smartly remove this
                        icon="fa-search"
                        size="medium"
                        type="text"
                        placeholder="Search street address" />
                </div>
                <div id="map" className="create-form__map bg-grey-100"></div>
            </React.Fragment>
           
        )
    }
}
