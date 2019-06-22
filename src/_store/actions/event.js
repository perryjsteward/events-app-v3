

// import axios from 'axios'; 
import { database } from '../firebase';
import * as types from './types';
import ReactGA from 'react-ga';


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
  ReactGA.event({
    category: 'Create Event',
    action: 'Started'
  });
  return { 
    type: types.CREATE_EVENT_START
  };
}

export const createEventSuccess = event => {
  ReactGA.event({
    category: 'Create Event',
    action: 'Created'
  });
  return { 
    type: types.CREATE_EVENT_SUCCESS,
    event: event,
    createSuccess: true
  };
}

export const createEventError = error => {
  ReactGA.event({
    category: 'Create Event',
    action: 'Failed'
  });
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
    database.ref(`/events/-${id}`).once('value')
      .then(result => {
        if(result.val()) {
          dispatch(readEventSuccess({ 
            id: id,
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
  ReactGA.event({
    category: 'Read Event',
    action: 'Started'
  });
  return { 
    type: types.READ_EVENT_START
  };
};

export const readEventSuccess = event => {
  ReactGA.event({
    category: 'Read Event',
    action: 'Read'
  });
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
  ReactGA.event({
    category: 'Update Event',
    action: 'Started'
  });
  return { 
    type: types.UPDATE_EVENT_START
  };
};

export const updateEventSuccess = event => {
  ReactGA.event({
    category: 'Update Event',
    action: 'Updated'
  });
  return { 
    type: types.UPDATE_EVENT_SUCCESS,
    event: event,
    updateSuccess: true
  };
};

export const updateEventError = error => {
  ReactGA.event({
    category: 'Update Event',
    action: 'Failed'
  });
  return { 
    type: types.UPDATE_EVENT_ERROR, 
    error: error ,
    updateSuccess: false
  };
};

