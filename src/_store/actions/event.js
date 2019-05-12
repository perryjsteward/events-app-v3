

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
          id: result.key.substr(1)
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


export const readEvent = id => {
  return dispatch => {
    dispatch(readEventStart());
    // needs updating
    console.log(id)
    database.ref(`/events/-${id}`).once('value')
      .then(result => {
        console.log(result.toJSON())
        if(result.val()) {
          dispatch(readEventSuccess({ 
            ...result.val()
          }))
        } else {
          document.location.href="/";
          // dispatch(readEventError({
          //   status: 404,
          //   message: 'No event found'
          // }))
        }
      })
      .catch(error => {
        document.location.href="/";
        // dispatch(readEventError(error))
      })
  }
};

export const readEventStart = () => {
  return { 
    type: types.READ_EVENT_START
  };
};

export const readEventSuccess = event => {
  return { 
    type: types.READ_EVENT_SUCCESS,
    event: event,
    readSuccess: true
  };
};

// export const readEventError = error => {
//   return { 
//     type: types.READ_EVENT_ERROR, 
//     error: error ,
//     readSuccess: false
//   };
// };


export const updateEvent = (id, event) => {
  console.log(event)
  return dispatch => {
    dispatch(updateEventStart());
    database.ref(`/events/-${id}`).set({ ...event })
      .then(result => {
        dispatch(updateEventSuccess({ 
          ...event, 
          id: id 
        }))
      })
      .catch(error => {
        dispatch(updateEventError(error))
      })
  }
};

export const updateEventStart = () => {
  return { 
    type: types.UPDATE_EVENT_START
  };
};

export const updateEventSuccess = event => {
  return { 
    type: types.UPDATE_EVENT_SUCCESS,
    event: event,
    updateSuccess: true
  };
};

export const updateEventError = error => {
  return { 
    type: types.UPDATE_EVENT_ERROR, 
    error: error ,
    updateSuccess: false
  };
};

export const deleteEvent = event => {
  // connect and delete a given event from firebase
  // then dispatch action reducer to the store based on result e.e. success failure 
};
