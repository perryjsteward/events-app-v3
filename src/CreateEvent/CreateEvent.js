import React from 'react';
import { Redirect } from "react-router-dom";
import ReactGA from 'react-ga';

// components
import CreateFormMap from  './CreateFormMap/CreateFormMap';
import CreateForm from './CreateForm/CreateForm';

// styling
import './CreateEvent.scss';

// state
import * as actions from '../_store/actions';
import { connect } from 'react-redux';


const CreateEvent = (props) => {

   ReactGA.pageview('/');

    const handleSubmit = event => {
      let currForm = [ ...event ];
      let formData = [];
      currForm.forEach(el => {
          if(el.value) formData[el.name] = el.value;
          if(el.name === 'upload_file' && el.value) formData[el.name] = props.imagePath;
      });
      // add location details
      if(props.selectedLocation){
          formData['location'] = props.selectedLocation;
      }
      // set attending
      formData['attending'] = 1;
      // could do this better
      // console.log("SUBMITTIN OK")
      props.onCreateEvent(formData);
    }

    if(props.event && props.createSuccess) {
      let id = props.event.id;
      return <Redirect to={`/event/${id}`}></Redirect>
    }
   
    return  (
      <div className="create-event__row">
        <CreateForm 
          error={props.error}
          onSubmit={event => handleSubmit(event)}>
        </CreateForm>
        <CreateFormMap></CreateFormMap>
      </div>
    );

};

const mapStateToProps = state => {
  return {
      createError: state.createError,
      createSuccess: state.createSuccess,
      event: state.event,
      imageError: state.imageError,
      imagePath: state.imagePath,
      selectedLocation: state.selectedLocation
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onCreateEvent: (event) => dispatch( actions.createEvent(event) ),
      onImageUpload: (image) => dispatch( actions.uploadImage(image) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(CreateEvent);