import React , { Component } from 'react';
import './ViewEvent.scss';

import ViewEventImage from './ViewEventImage/ViewEventImage';
import ViewEventHeaderControls from './ViewEventHeaderControls/ViewEventHeaderControls';
import ViewEventFooterControls from './ViewEventFooterControls/ViewEventFooterControls';
import ViewEventContent from './ViewEventContent/ViewEventContent';
import ViewEventSidebar from './ViewEventSidebar/ViewEventSidebar';

class ViewEvent extends Component {

    render() {
        return (
            <React.Fragment>
                <ViewEventHeaderControls></ViewEventHeaderControls>
                <ViewEventImage></ViewEventImage>
                <div className="view-event__row">
                    <ViewEventContent></ViewEventContent>
                    <ViewEventSidebar></ViewEventSidebar>
                </div>
                <ViewEventFooterControls></ViewEventFooterControls>
            </React.Fragment>
        );
    } 
};

export default ViewEvent;