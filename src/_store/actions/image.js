// import axios from 'axios'; 
import { storage } from '../firebase';
import * as types from './types';
import ReactGA from 'react-ga';

export const uploadImage = image => {
    return dispatch => {
        
        dispatch(uploadImageStart());
        const name = `${image.lastModified}-${image.size}-${image.name}`;
        storage.ref(`/images/${name}`).put(image)
            .then(result => {
                dispatch(uploadImageSuccess(result.metadata.fullPath))
            })
            .catch(error => {
                dispatch(uploadImageError(error))
            })
    }
}

export const uploadImageStart = () => {
    ReactGA.event({
        category: 'Upload Image',
        action: 'Started'
    });
    return { 
        type: types.UPLOAD_IMAGE_START
    };
  }
  
export const uploadImageSuccess = imagePath => {
    ReactGA.event({
        category: 'Upload Image',
        action: 'Uploaded'
    });
    return { 
        type: types.UPLOAD_IMAGE_SUCCESS,
        imagePath: imagePath
    };
}

export const uploadImageError = error => {
    ReactGA.event({
        category: 'Upload Image',
        action: 'Failed'
    });
    return { 
        type: types.UPLOAD_IMAGE_ERROR, 
        error: error 
    };
}