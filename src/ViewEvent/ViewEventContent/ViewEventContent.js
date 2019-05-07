import React from 'react';
import './ViewEventContent.scss';

const ViewEventContent = () => {
    return (
        <div className="event__content-container">
            <div className="event__content-type"></div>
            <div className="event__content-title"></div>
            <div className="event__content-address"></div>
            <div className="event__content-date"></div>
            <div className="event__content-description"></div>
        </div>
    );
};

export default ViewEventContent;