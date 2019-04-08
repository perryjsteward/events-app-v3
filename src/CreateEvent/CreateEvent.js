import React from 'react';

// components
import CreateFormMap from  './CreateFormMap/CreateFormMap';
import CreateForm from './CreateForm/CreateForm';

// styling
import './CreateEvent.scss';

// state
import * as actions from '../_store/actions';
import { connect } from 'react-redux';

const CreateEvent = (props) => {

    const handleSubmit = event => {
      let currForm = [ ...event ];
      let formData = [];
      currForm.forEach(el => {
          if(el.value) formData[el.name] = el.value;
      });
      props.onCreateEvent(formData);
    }
   
    return  (
      <div className="create-event__row">
        <CreateForm 
          error={props.error}
          onSubmit={(event) => handleSubmit(event)}>
        </CreateForm>
        <CreateFormMap></CreateFormMap>
      </div>
    );

};


const mapStateToProps = state => {
  return {
      error: state.createFormError
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onCreateEvent: (event) => dispatch( actions.createEvent(event) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(CreateEvent);