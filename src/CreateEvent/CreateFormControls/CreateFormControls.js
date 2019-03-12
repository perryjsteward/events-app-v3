import React from 'react';
import './CreateFormControls.scss';
import Button from '../../shared/Button/Button';

const CreateFormControls = () => {
    return (
        <div className="create-form__controls-container">
            <div className="create-form__controls-content">
                <div className="create-form__controls__button-wrapper">
                    <Button 
                        type="link" 
                        size="medium">
                        Reset
                    </Button>
                    <Button 
                        type="primary" 
                        size="medium">
                        Next
                    </Button>
                </div>  
            </div>
        </div>
    );
};

export default CreateFormControls;