import React from 'react';
import './ViewEventImage.scss'

const ViewEventImage = (props) => {

    let url ='';
    let bgStyle = {};

    if(props.event && props.event.upload_file){
        const file = encodeURIComponent(props.event.upload_file);
        url = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_BUCKET}/o/${file}?alt=media`;
        bgStyle = {
            backgroundImage: `url(${url})`
        }
    } 
    if(props.event && !props.event.upload_file){
        const file = encodeURIComponent("images/1534185444204-4089929-balloons-birthday-celebrate-1071882.jpg");
        url = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_BUCKET}/o/${file}?alt=media`;
        bgStyle = {
            backgroundImage: `url(${url})`
        }
    }
  

    return (
        <div className="event__image-container">
            <div className="event__image-bg" style={bgStyle}></div>
            <div className="event__image-main" style={bgStyle}></div>
        </div>
    );
};

export default ViewEventImage;

