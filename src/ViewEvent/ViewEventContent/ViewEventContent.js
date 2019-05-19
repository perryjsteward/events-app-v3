import React from 'react';
import './ViewEventContent.scss';
import moment from "moment";
import ViewEventMap from '../ViewEventMap/ViewEventMap';
import ReactGA from 'react-ga';

const ViewEventContent = (props) => {

    let eventType = <div className="event__content-type__loading"></div>;
    let eventName = <div className="event__content-title__loading"></div>;
    let eventAddress = <div className="event__content-address__loading"></div>;
    let eventDate = <div className="event__content-date__loading"></div>;
    let eventDescription = <div className="event__content-description__loading"></div>;
    let eventMap = <div className="event__content-map__loading"></div>;
    let eventHelp = <div className="event__content-help__loading"></div>;

    if(props.event){
        eventType = (
            <div className="event__content-type">
                <span className="fas fa-unlock-alt"></span>
                <p>PUBLIC EVENT</p>
            </div>
        );
    }

    if(props.event && props.event.name){
        eventName = (
            <div className="event__content-title">
                <h4>{props.event.name}</h4>
            </div>        
        );
    }

    if(props.event && props.event.location){
        eventAddress = (
            <div 
                onClick={() => openMap(props.event.location.address)}
                className="event__content-location">
                <span className="fas fa-map-marker-alt"></span>
                <p>{props.event.location.address}</p>
            </div>
        );   

        eventMap = (
            <div className="event__content-map">
                <div className="break-line"></div>
                <p className="title">Where to go</p>
                <p className="text">Click the marker for directions to the event</p>
                <div className="map">
                    <ViewEventMap event={props.event} id="view-main"></ViewEventMap>
                </div>
            </div>
        );
    }

    if(props.event && props.event.start_date){
        let seperator = '';
        let start_date = moment(props.event.start_date).format('Do MMM YYYY').toString();
        let start_time = props.event.start_time;
        let end_date = '';
        let end_time = '';
        

        if(props.event.end_date || props.event.end_time) {
            seperator = ' - ';
        }

        if(props.event.end_date){
            end_date = moment(props.event.end_date).format('Do MMM YYYY').toString();
        }

        if(props.event.end_time){
            end_time = props.event.end_time;
        }
        eventDate = (
            <div className="event__content-date">
                <span className="far fa-calendar"></span>
                <p>{start_date} {start_time} {seperator} {end_date} {end_time}</p>
            </div>
        );
    }
    
    if(props.event && props.event.description){
        eventDescription = (
            <div className="event__content-description">
                <p className="sub-title">Description</p>
                <p>{props.event.description}</p>
            </div>
        );
    }

    const openMap = address => {
        window.location.href = `http://maps.google.com/?daddr=${address}`;
        ReactGA.event({
            category: 'View Event',
            action: 'Link Directions Opened'
        });
    }


    if(props.event){
        const body = encodeURI(`Hi EventsApp team! \n\n I would love your help with this event ${document.location}`)
        eventHelp = (
            <div className="event__content-help">
                <p className="sub-title">Help</p>
                <p>Need some help? <a href={`mailto:help.eventsapp@gmail.com?subject=I need help with Event: ${props.id}&body=${body}`}>Send us an email</a></p>
            </div>
        );
    }

    return (
        <div className="event__content-container">
            {eventType}
            {eventName}
            {eventAddress}
            {eventDate}
            {eventDescription}
            {eventMap}
            {eventHelp}
        </div>
    );
};

export default ViewEventContent;