/*
    https://richmarr.wordpress.com/2008/01/07/adding-events-to-users-calendars-part-2-web-calendars/
*/
import React from 'react';
import * as ics from 'ics';
import './ViewEventSave.scss';

const ViewEventSave = props => {


    const getICal = event => {
        return event = {
            start: [2018, 5, 30, 6, 30],
            duration: { hours: 6, minutes: 30 },
            title: 'Bolder Boulder',
            description: 'Annual 10-kilometer run in Boulder, Colorado',
            location: 'Folsom Field, University of Colorado (finish line)',
            url: 'http://www.bolderboulder.com/',
            geo: { lat: 40.0095, lon: 105.2669 },
            categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
            status: 'CONFIRMED',
            organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
            attendees: [
              { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
              { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
            ]
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
            <p>Save the event to your calendar: The Strokes @ All points East at Victoria Park</p>
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