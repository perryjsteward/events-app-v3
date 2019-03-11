import React from 'react';
import CreateEventControls from '../CreateEventControls/CreateEventControls';
import './CreateEventForm.scss';

import Input from '../../shared/Input/Input';

const Form = () => {
    return (
        <div className='create-form__container'>
            <div className="create-form__content">
                <h4>Create an Event</h4>
                <p>Pop your event information here and get your free page to share with friends and family.</p>
                <br/>
                <Input 
                    size="large" 
                    type="text" 
                    label="Label name" 
                    placeholder="Enter Something here"/>
                <Input 
                    size="large" 
                    type="text" 
                    label="Label name" 
                    placeholder="Enter Something here"/>
                <Input 
                    size="large" 
                    type="text" 
                    label="Label name" 
                    placeholder="Enter Something here"/>
            </div>
            <CreateEventControls></CreateEventControls>
        </div>
    );
};

export default Form;