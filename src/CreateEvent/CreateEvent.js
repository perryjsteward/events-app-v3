import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

// components
import CreateFormMap from  './CreateFormMap/CreateFormMap';
import CreateForm from './CreateForm/CreateForm';

// styling
import './CreateEvent.scss';

// state
import * as actions from '../_store/actions';
import { connect } from 'react-redux';

class CreateEvent extends Component {

    handleSubmit = event => {
      let currForm = [ ...event ];
      let formData = [];
      currForm.forEach(el => {
          if(el.value) formData[el.name] = el.value;
          if(el.name === 'upload_file' && el.value) formData[el.name] = this.props.imagePath;
      });
      // add location details
      if(this.props.selectedLocation){
          formData['location'] = this.props.selectedLocation;
      }
      // could do this better
      this.props.onCreateEvent(formData);
    }
   
    render(){

      this.props.resetReadState();

      if(this.props.event && this.props.createSuccess) {
        let id = btoa(this.props.event.id);
        return <Redirect to={`/event/${id}`}></Redirect>
      }

      return  (
        <div className="create-event__row">
          <CreateForm 
            error={this.props.error}
            onSubmit={event => this.handleSubmit(event)}>
          </CreateForm>
          <CreateFormMap></CreateFormMap>
        </div>
      );
    }
    

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
      onImageUpload: (image) => dispatch( actions.uploadImage(image) ),
      resetReadState: () => dispatch( actions.resetReadState())
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(CreateEvent);