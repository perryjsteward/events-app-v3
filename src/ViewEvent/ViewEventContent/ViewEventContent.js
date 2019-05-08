import React from 'react';
import './ViewEventContent.scss';

import ViewEventMap from '../ViewEventMap/ViewEventMap';

const ViewEventContent = (props) => {

    return (
        <div className="event__content-container">
            <div className="event__content-type">
                <span className="fas fa-unlock-alt"></span>
                <p>PUBLIC EVENT</p>
            </div>
            <div className="event__content-title">
                <h4>The Strokes @ All Points East</h4>
            </div>
            <div className="event__content-location">
                <span className="fas fa-map-marker-alt"></span>
                <p>Victoria Park, Grove rd, London, NW6 6NH</p>
            </div>
            <div className="event__content-date">
                <span className="far fa-calendar"></span>
                <p>24th March 18:00 - Late</p>
            </div>

            {/* <div className="break-line"></div> */}

            <div className="event__content-description">
                <p className="sub-title">Description</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum nulla vel diam ultricies, nec tincidunt justo accumsan. Quisque ullamcorper dapibus dui ut tincidunt. Suspendisse lacinia eget nulla et lacinia. In eget ex lacus. Aenean sed congue nisl, vitae dictum ipsum. Nunc sed mi a risus venenatis aliquam. Nulla risus urna, congue id pharetra quis, condimentum consequat magna. Sed ornare non mauris quis mollis. Donec commodo justo sit amet eros pulvinar, a semper libero dictum. Phasellus sagittis quam sed sollicitudin euismod. Sed non justo non magna consectetur auctor. Nunc mattis urna sed mi ornare porta id a ligula.</p>
            </div>

            <div className="event__content-map">
                <div className="break-line"></div>
                <p className="title">Where to go</p>
                <p className="text">Click the marker for directions to the event</p>
                <div className="map">
                    <ViewEventMap id="view-main"></ViewEventMap>
                </div>
            </div>
            
        </div>
    );
};

export default ViewEventContent;