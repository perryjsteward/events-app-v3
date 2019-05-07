import React from 'react';
import './ViewEvent.scss';

import ViewEventImage from './ViewEventImage/ViewEventImage';
import ViewEventControls from './ViewEventControls/ViewEventControls';
import ViewEventContent from './ViewEventContent/ViewEventContent';

const ViewEvent = () => {
    return (
        <React.Fragment>
            <ViewEventControls></ViewEventControls>
            <ViewEventImage></ViewEventImage>
            <ViewEventContent></ViewEventContent>
        </React.Fragment>
    );
};

export default ViewEvent;