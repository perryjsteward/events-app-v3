import React from 'react';
import './CreateFormControls.scss';
import Button from '../../shared/Button/Button';


const CreateFormControls = (props) => {
    
    return (
        <div className="create-form__controls-container">
            <div className="create-form__controls-content">
                <div className="create-form__controls__button-wrapper">
                    <Button 
                        onClick={props.onReset}
                        type="link" 
                        size="medium">
                        Reset
                    </Button>
                    <Button 
                        disabled={!props.isValid}
                        onClick={props.onSubmit}
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