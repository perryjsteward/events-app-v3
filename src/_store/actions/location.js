import * as types from './types';
import ReactGA from 'react-ga';

export const setSelectedLocation = location => {
    ReactGA.event({
      category: 'Location',
      action: 'Set'
    });
    return { 
      type: types.SET_SELECTED_LOCATION,
      selectedLocation: location
    };
  }