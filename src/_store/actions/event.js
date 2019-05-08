

// import axios from 'axios'; 
import { database } from '../firebase';
import * as types from './types';

export const createEventWithImage = event => {

}

export const createEvent = event => {
  return dispatch => {
    dispatch(createEventStart());
    database.ref('/events').push(event)
      .then(result => {
        dispatch(createEventSuccess({ 
          ...event, 
          id: result.key 
        }))
      })
      .catch(error => {
        dispatch(createEventError(error))
      })
  }
};

export const createEventStart = () => {
  return { 
    type: types.CREATE_EVENT_START
  };
}

export const createEventSuccess = event => {
  return { 
    type: types.CREATE_EVENT_SUCCESS,
    event: event,
    createSuccess: true
  };
}

export const createEventError = error => {
  return { 
    type: types.CREATE_EVENT_ERROR, 
    error: error ,
    createSuccess: false
  };
}


export const readEvent = event => {
  // connect and get a requested event from firebase
  // then dispatch action reducer to the store based on result e.e. success failure 
};

export const updateEvent = event => {
  // connect and update a given event from firebase
  // then dispatch action reducer to the store based on result e.e. success failure 
};

export const deleteEvent = event => {
  // connect and delete a given event from firebase
  // then dispatch action reducer to the store based on result e.e. success failure 
};