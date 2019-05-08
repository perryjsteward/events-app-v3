import React from 'react';
import './ViewEventFooterControls.scss';
import Button from '../../_shared/Button/Button';

const ViewEventFooterControls = () => {
    return (
        <div className="view-form__controls-container">
            <div className="view-form__controls-content">
                <div className="view-form__controls__button-wrapper">
                    <div className="view-form__attending">
                        <span className="far fa-thumbs-up"></span>
                        <p>54 going</p>
                    </div>
                    <Button
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