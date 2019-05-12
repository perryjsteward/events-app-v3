import * as actions from './actions';

import { updateObject } from '../_utils/objectUtils';

const initialState = {}

// EVENTS
const createEventStart = (state, action) => {
  return updateObject(state, { 
    isLoading: true
  })
}

const createEventSuccess = (state, action) => {
  return updateObject(state, { 
    isLoading: false,
    event: action.event,
    createSuccess: action.createSuccess
  })
}

const createEventFail = (state, action) => {
  return updateObject(state, { 
    isLoading: false,
    createError: action.error,
    createSuccess: action.createSuccess
  })
}

// READ EVENTS
const readEventStart = (state, action) => {
  return updateObject(state, { 
    isLoading: true
  })
}

const readEventSuccess = (state, action) => {
  return updateObject(state, { 
    isLoading: false,
    event: action.event,
    readSuccess: true
  })
}

const readEventFail = (state, action) => {
  return updateObject(state, { 
    isLoading: false,
    readError: action.error,
    readSuccess: false
  })
}

// UPDATE EVENTS
const updateEventStart = (state, action) => {
  return state;
}

const updateEventSuccess = (state, action) => {
  return updateObject(state, { 
    event: action.event,
    updateSuccess: true
  })
}

const updateEventFail = (state, action) => {
  return updateObject(state, { 
    updateError: action.error,
    updateSuccess: false
  })
}

// IMAGES
const uploadImageStart = (state, action) => {
  return updateObject(state, { 
    isImageUploading: true,
    hasImageUploaded: false,
  })
}

const uploadImageSuccess = (state, action) => {
  return updateObject(state, { 
    isImageUploading: false,
    hasImageUploaded: true,
    imagePath: action.imagePath
  })
}

const uploadImageFail = (state, action) => {
  return updateObject(state, { 
    isImageUploading: false,
    hasImageUploaded: false,
    imageError: action.error
  })
}

// location
const setSelectedLocation = (state, action) => {
  return updateObject(state, { 
    selectedLocation: action.selectedLocation
  })
}

export default (state = initialState, action) => {
  switch(action.type) {
    // LOCATION
    case actions.SET_SELECTED_LOCATION: return setSelectedLocation(state, action);
    // CREATE EVENTS
    case actions.CREATE_EVENT_START: return createEventStart(state, action);
    case actions.CREATE_EVENT_SUCCESS: return createEventSuccess(state, action);
    case actions.CREATE_EVENT_ERROR: return createEventFail(state, action);
     // READ EVENTS
    case actions.READ_EVENT_START: return readEventStart(state, action);
    case actions.READ_EVENT_SUCCESS: return readEventSuccess(state, action);
    case actions.READ_EVENT_ERROR: return readEventFail(state, action);
     // READ EVENTS
     case actions.UPDATE_EVENT_START: return updateEventStart(state, action);
     case actions.UPDATE_EVENT_SUCCESS: return updateEventSuccess(state, action);
     case actions.UPDATE_EVENT_ERROR: return updateEventFail(state, action);
    // IMAGES
    case actions.UPLOAD_IMAGE_START: return uploadImageStart(state, action);
    case actions.UPLOAD_IMAGE_SUCCESS: return uploadImageSuccess(state, action);
    case actions.UPLOAD_IMAGE_ERROR: return uploadImageFail(state, action);
    default: return state;
  }
};