import React from 'react';
import './ViewEventHeaderControls.scss';
import { Link } from "react-router-dom";

const ViewEventHeaderControls = () => {
    return (
        <React.Fragment>
            <div className="event__controls-container">
                <Link to='/'>
                    <span className="fas fa-chevron-left event__view-controls"></span>
                </Link>
            </div>
        </React.Fragment>
    );
};

export default ViewEventHeaderControls;