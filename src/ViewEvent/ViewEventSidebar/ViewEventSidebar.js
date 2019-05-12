import React from 'react';
import moment from 'moment';
import './ViewEventSidebar.scss';
import ViewEventMap from '../ViewEventMap/ViewEventMap';
import Button from '../../_shared/Button/Button';

const ViewEventSidebar = (props) => {

    let eventMap = '';
    let eventDate = ''

    let attending = props.event ? props.event.attending : 1;

    if(props.event && props.event.location){
        eventMap =(
            <div className="sidebar__map">
                <ViewEventMap location={props.event.location} id="view-sidebar"></ViewEventMap>
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
            <div className="sidebar-date">
                <span className="far fa-calendar"></span>
                <p>{start_date} {start_time} {seperator} {end_date} {end_time}</p>
            </div>
        );
    }

    if(props.event && props.event.location){
        return (
            <div className="sidebar__container">
                <div className="sidebar__box">
                    {eventDate}
                    {eventMap}
                    <div className="sidebar__controls">
                        <div className="sidebar-attending">
                            <span className="far fa-thumbs-up"></span>
                            <p>{attending} going</p>
                        </div>
                        <Button
                            onClick={() => props.onSave()}
                            type="primary" 
                            size="small">
                            Add to calendar
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="sidebar__container"></div>
        );
    }
};

export default ViewEventSidebar;