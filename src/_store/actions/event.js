

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
  console.log("CREATE START")
  return { 
    type: types.CREATE_EVENT_START
  };
}

export const createEventSuccess = event => {
  console.log("CREATE SUCCESS")
  return { 
    type: types.CREATE_EVENT_SUCCESS,
    event: event
  };
}

export const createEventError = error => {
  console.log("CREATE ERROR")
  return { 
    type: types.CREATE_EVENT_ERROR, 
    error: error 
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