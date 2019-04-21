import * as types from './types';

export const setSelectedLocation = location => {
    console.log("SET LOCATION")
    return { 
      type: types.SET_SELECTED_LOCATION,
      selectedLocation: location
    };
  }