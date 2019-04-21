// import axios from 'axios'; 
import { storage } from '../firebase';
import * as types from './types';

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
    console.log("UPLOADING START")
    return { 
        type: types.UPLOAD_IMAGE_START
    };
  }
  
export const uploadImageSuccess = imagePath => {
    console.log("UPLOADING SUCCESS")
    return { 
        type: types.UPLOAD_IMAGE_SUCCESS,
        imagePath: imagePath
    };
}

export const uploadImageError = error => {
    console.log("UPLOADING ERROR")
    return { 
        type: types.UPLOAD_IMAGE_ERROR, 
        error: error 
    };
}