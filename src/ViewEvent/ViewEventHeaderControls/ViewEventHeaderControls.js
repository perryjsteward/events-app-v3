import React from 'react';
import './ViewEventHeaderControls.scss';
import { Link } from "react-router-dom";

const ViewEventHeaderControls = (props) => {
    return (
        <React.Fragment>
            <div className="event__controls-container">
                <Link to='/'>
                    <div className="event__controls-icon__container">
                        <div className="event__controls-icon__bg"></div>
                        <span className="fas fa-chevron-left event__controls-icon"></span>
                    </div>   
                </Link>
                <div className="align-right">
                    <div 
                        onClick={() => props.onSave()}
                        className="event__controls-icon__container">
                        <div className="event__controls-icon__bg"></div>
                        <span className="far fa-heart event__controls-icon"></span>
                    </div> 
                    <div className="spacer"></div>
                    <div
                        onClick={() => props.onShare()} 
                        className="event__controls-icon__container">
                        <div className="event__controls-icon__bg"></div>
                        <span className="far fa-paper-plane event__controls-icon"></span>
                    </div> 
                </div>
            </div>
        </React.Fragment>
    );
};

export default ViewEventHeaderControls;