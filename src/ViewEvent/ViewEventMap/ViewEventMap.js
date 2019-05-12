import React, { Component } from 'react';
import Script from 'react-load-script';
import './ViewEventMap.scss'
/* global google */
class ViewEventMap extends Component {

    handleScriptLoad = (props) => {
        // do things to load map

        if(this.props.location){
            const location = {
                lat: this.props.location.lat, 
                lng: this.props.location.lng, 
            };
    
            const map = new google.maps.Map(document.getElementById(this.props.id), {
                center: location,
                zoom: 15,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
            });
            const marker = new google.maps.Marker({position: location, map: map}); 

            google.maps.event.addListener(marker, 'click', () => this.openMap(location));
            
        }
       
    }

    openMap = loc => {
        window.location.href = `http://maps.google.com/?q=${loc.lat}+${loc.lng}`;
    }

    render () {
        return (
             <React.Fragment>
                <Script 
                    onLoad={this.handleScriptLoad} 
                    url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`}/>
                <div 
                    id={this.props.id} 
                    className="view-event__map bg-grey-100">
                </div>
            </React.Fragment>
        );
    };
};

export default ViewEventMap;