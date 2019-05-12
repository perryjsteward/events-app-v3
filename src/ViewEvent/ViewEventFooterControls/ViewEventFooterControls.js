import React from 'react';
import './ViewEventFooterControls.scss';
import Button from '../../_shared/Button/Button';

const ViewEventFooterControls = (props) => {

    let attending = props.event ? props.event.attending : 1;
    
    return (
        <div className="view-form__controls-container">
            <div className="view-form__controls-content">
                <div className="view-form__controls__button-wrapper">
                    <div className="view-form__attending">
                        <span className="far fa-thumbs-up"></span>
                        <p>{attending} going</p>
                    </div>
                    <Button
                        onClick={() => props.onSave()}
                        type="primary" 
                        size="medium">
                        Add to calendar
                    </Button>
                </div>  
            </div>
        </div>
    );
};

export default ViewEventFooterControls;