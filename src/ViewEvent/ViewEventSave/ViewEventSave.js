/*
    https://richmarr.wordpress.com/2008/01/07/adding-events-to-users-calendars-part-2-web-calendars/
*/
import React from 'react';
import * as ics from 'ics';
import './ViewEventSave.scss';
import { trimText, removeCommas, getStartDateTime, getDuration } from '../../_utils/eventUtils';

const ViewEventSave = props => {

    let subText = 'Save the event to your calendar';

    if(props.event){
        subText += `: ${props.event.name}`;
    }

    if(props.event && props.event.location && props.event.location.name){
        subText += ` at ${props.event.location.name}`;
    }

    const getICal = event => {
        if(props.event) {
            return event = {
                start: getStartDateTime(props.event),
                duration: getDuration(props.event),
                title: props.event.name,
                description: trimText(props.event.description),
                location: removeCommas(props.event.location.address),
                url: document.location.href,
                geo: { lat: props.event.location.lat, lon: props.event.location.lng },
                categories: ['EventsApp'],
                status: 'CONFIRMED',
            }
        }

    }

    const saveICal = () => {
        const event = getICal();
        ics.createEvent(event, (error, value) => {
            if (error) {
              console.log(error);
              return
            }
            download('event.ics', value);
            props.onAddToCalendar();
        });
    }

    const download = (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

    return (
        <div>
            <h5>Save Event</h5>
            <p>{subText}</p>
            <ul>
                <li>
                    {/* eslint-disable-next-line */}
                    <a id="apple-link"
                        onClick={() => saveICal()}>
                        Download iCal
                    </a>
                </li>
                {/* <li>
                    <a id="google-link"
                        href={googleLink}
                        target="_blank noreferrer noopener">
                        Google Calendar
                    </a>
                </li>
                <li>
                    <a id="outlook-link"
                        href={`/`}>
                        Outlook
                    </a>
                </li>
                <li>
                    <a id="yahoo-link"
                        href={yahooLink}
                        target="_blank noreferrer noopener">
                        Yahoo Calendar
                    </a>
                </li> */}
            </ul>
        </div>
    );
};

export default ViewEventSave;