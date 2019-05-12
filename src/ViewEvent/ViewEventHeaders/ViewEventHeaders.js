import React from 'react';
import { Helmet } from 'react-helmet'
import { trimText } from '../../_utils/eventUtils';

const ViewEventHeaders = props => {
    let name = 'EventsApp';
    let description, imgUrl;

    if(props.event && props.event.name){
        name = props.event.name
    }

    if(props.event && props.event.description){
        description = trimText(props.event.description)
    }

    if(props.event && props.event.upload_file){
        imgUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_BUCKET}/o/${props.event.upload_file}?alt=media`;
    }

    return (    
        <Helmet>
            <title>{name}</title>
            <meta property="og:title" content={name} />
            <meta property="og:url" content={document.location} />
            <meta property="og:description" content={description} />
            <meta property="fb:app_id" content="1846350962106408" />
            <meta property="og:image" content={imgUrl} /> 
        </Helmet>
    );
};

export default ViewEventHeaders;