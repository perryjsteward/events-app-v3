import * as actions from './actions';

import { updateObject } from '../_utils/objectUtils';

const initialState = {
  isLoading: false,
  event: {},
  createFormError: {}
}

// EVENTS
const createEventStart = (state, action) => {
  return updateObject(state, { 
    isLoading: true
  })
}

const createEventSuccess = (state, action) => {
  return updateObject(state, { 
    isLoading: false,
    event: action.event
  })
}

const createEventFail = (state, action) => {
  return updateObject(state, { 
    isLoading: false,
    createError: action
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
    imageError: action
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
    // EVENTS
    case actions.CREATE_EVENT_START: return createEventStart(state, action);
    case actions.CREATE_EVENT_SUCCESS: return createEventSuccess(state, action);
    case actions.CREATE_EVENT_ERROR: return createEventFail(state, action);
    // IMAGES
    case actions.UPLOAD_IMAGE_START: return uploadImageStart(state, action);
    case actions.UPLOAD_IMAGE_SUCCESS: return uploadImageSuccess(state, action);
    case actions.UPLOAD_IMAGE_ERROR: return uploadImageFail(state, action);
    default: return state;
  }
};