import React, { Component } from 'react';
import Script from 'react-load-script';
import './ViewEventMap.scss'
import ReactGA from 'react-ga';

/* global google */
class ViewEventMap extends Component {

    state = {
        scriptLoaded: false
    }

    handleScriptCreate = () => {
        this.setState({ scriptLoaded: false })
    }
       
    handleScriptError = () => {
        this.setState({ scriptError: true })
    }
       
    handleScriptLoad = () => {
        this.setState({ scriptLoaded: true })
        this.loadLocation();
    }

    loadLocation = () => {
        // do things to load map
        if(this.props.event && this.props.event.location){
            const location = {
                lat: this.props.event.location.lat, 
                lng: this.props.event.location.lng, 
            };
    
            const map = new google.maps.Map(document.getElementById(this.props.id), {
                center: location,
                zoom: 15,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
            });
            const marker = new google.maps.Marker({position: location, map: map}); 

            google.maps.event.addListener(marker, 'click', () => this.openMap(this.props.event.location));
            
        }
       
    }

    openMap = loc => {
        window.location.href = `http://maps.google.com/?daddr=${loc.address}`;
        ReactGA.event({
            category: 'View Event',
            action: 'Map Directions Opened'
        });
    }

    render () {
        if(this.state.scriptLoaded) {
            this.loadLocation();
        }
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