import React from 'react';

// components
import Map from  './Map/Map';
import CreateEventForm from './CreateEventForm/CreateEventForm';

// styling
import './CreateEvent.css';

const CreateEvent = () => {
  return (
    <div className="create-form__row">
      <CreateEventForm></CreateEventForm>
      <Map></Map>
    </div>
  );
};

export default CreateEvent;