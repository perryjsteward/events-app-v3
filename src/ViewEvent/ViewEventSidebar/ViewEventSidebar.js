import React from 'react';
import './ViewEventSidebar.scss';
import ViewEventMap from '../ViewEventMap/ViewEventMap';
import Button from '../../_shared/Button/Button';

const ViewEventSidebar = () => {

    return (
        <div className="sidebar__container">
            <div className="sidebar__box">
                <div className="sidebar-date">
                    <span className="far fa-calendar"></span>
                    <p>24th March 18:00 - Late</p>
                </div>
                <div className="sidebar__map">
                    <ViewEventMap id="view-sidebar"></ViewEventMap>
                </div>
                <div className="sidebar__controls">
                    <div className="sidebar-attending">
                        <span className="far fa-thumbs-up"></span>
                        <p>54 going</p>
                    </div>
                    <Button
                        type="primary" 
                        size="small">
                        Add to calendar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ViewEventSidebar;