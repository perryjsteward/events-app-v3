import * as actions from './actions';

import { updateObject } from '../_utils/objectUtils';

const initialState = {
  isLoading: false,
  event: {},
  createFormError: {}
}

const createEventStart = (state, action) => {
  console.log("isLoading: true")
  return updateObject(state, { isLoading: true})
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
    createError: action.createError
  })
}

export default (state = initialState, action) => {
  switch(action.type) {
    case actions.CREATE_EVENT_START: return createEventStart(state, action);
    case actions.CREATE_EVENT_SUCCESS: return createEventSuccess(state, action);
    case actions.CREATE_EVENT_FAIL: return createEventFail(state, action);
    default: return state;
  }
};