import React, { Component } from 'react';
import Script from 'react-load-script';
import './ViewEventMap.scss'
/* global google */
class ViewEventMap extends Component {

    handleScriptLoad = (props) => {
        // do things to load map
        let location = {
            lat: 10, 
            lng: 10, 
        };

        let map = new google.maps.Map(document.getElementById(this.props.id), {
            center: location,
            zoom: 10,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
        });
        new google.maps.Marker({position: location, map: map}); 
    }

    render () {
        return (
             <React.Fragment>
                <Script 
                    onLoad={this.handleScriptLoad} 
                    url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBY_d1jFhjDOyMnTa4eKfPMhTqu8H8I9sQ&libraries=places'/>
                <div id={this.props.id} className="view-event__map bg-grey-100"></div>
            </React.Fragment>
        );
    };
};

export default ViewEventMap;