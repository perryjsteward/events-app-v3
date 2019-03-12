import React from 'react';
import Button from '../../shared/Button/Button';

const Upload = (props) => {

    let simpleUpload = (
        <React.Fragment>
            <Button
                size="small" 
                outline>
                Upload
            </Button>
            <span class="form__upload-hint">
                {props.children}
            </span>
        </React.Fragment>
    );

    let improvedUpload = (
        <div className="form__upload-area">
            
        </div>
    );


    return (
        <div className="form-control form__upload-control">
            {true ? improvedUpload : simpleUpload}
        </div>
    );
};

export default Upload;