import React from 'react';
import CreateEventControls from '../CreateEventControls/CreateEventControls';
import './CreateEventForm.scss';

import Input from '../../shared/Input/Input';
import Upload from '../../shared/Upload/Upload';

const Form = () => {
    return (
        <div className='create-form__container'>
            <div className="create-form__content">
                <h4>Create an Event</h4>
                <p>Pop your event information here and get your free page to share with friends and family.</p>
                <br/>
                {/* <Upload>Select a background image</Upload> */}
                <Input  
                    required
                    type="text" 
                    label="Event name" 
                    placeholder="e.g. My Birthday Party"/>
                <Input 
                    type="text" 
                    label="Description" 
                    placeholder="Enter Something here"/>
                <div className="form-control">
                    <div className="inline">
                        <Input 
                            required
                            type="date" 
                            label="Start Date" 
                            placeholder="Enter Something here"/>
                    </div>
                    <div className="inline">
                        <Input 
                            required
                            type="time" 
                            label="Start Time" 
                            placeholder="Enter Something here"/>
                    </div>
                </div>
                <div className="form-control">
                    <div className="inline">
                        <Input 
                            type="date" 
                            label="End Date" 
                            placeholder="Enter Something here"/>
                    </div>
                    <div className="inline">
                        <Input 
                            type="time" 
                            label="End Time" 
                            placeholder="Enter Something here"/>
                    </div>
                </div>
            </div>
            <CreateEventControls></CreateEventControls>
        </div>
    );
};

export default Form;