import React from 'react';

// components
import CreateFormMap from  './CreateFormMap/CreateFormMap';
import CreateForm from './CreateForm/CreateForm';

// styling
import './CreateEvent.scss';

const CreateEvent = () => {
  return (
    <div className="create-event__row">
      <CreateForm></CreateForm>
      <CreateFormMap></CreateFormMap>
    </div>
  );
};

export default CreateEvent;