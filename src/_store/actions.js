
export const CREATE_EVENT_START = 'CREATE_EVENT_START';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAIL = 'CREATE_EVENT_FAIL';

export const READ_EVENT_START = 'READ_EVENT_START';
export const READ_EVENT_SUCCESS = 'READ_EVENT_SUCCESS';
export const READ_EVENT_FAIL = 'READ_EVENT_FAIL';

export const UPDATE_EVENT_START = 'UPDATE_EVENT_START';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAIL = 'UPDATE_EVENT_FAIL';

export const DELETE_EVENT_START = 'DELETE_EVENT_START';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAIL = 'DELETE_EVENT_FAIL';


export const createEvent = event => {
  console.log("from actions: ", event);
  return { type: CREATE_EVENT_START };
 // connect and send to Firebase here
 // then dispatch action reducer to the store based on result e.e. success failure 
};

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