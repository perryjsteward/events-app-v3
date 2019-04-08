import React from 'react';
import Button from '../../_shared/Button/Button';

const Upload = (props) => {

    let fileInput = null;
    let inputHint = '';
    let type = '';
    let helperText = "Upload a photo";

    let uploadHint = props.fileName ? props.fileName : helperText;
    let acceptedTypes = props.acceptedTypes ? props.acceptedTypes.join('') : null;

    if(props.hint && !props.isValid && props.hasStarted){
        inputHint = (
            <span className="form__upload-hint">
                <div className="input__hint file-uploader__hint">
                    {props.hint}
                </div>
            </span>
        );
        type = 'warning'
    }

    let handleClick = () => {
        fileInput.click();
    }

    let button = (
        <Button
            type={type}
            onClick={handleClick}
            size="small" 
            outline>
            Browse files
        </Button>
    )

    let input = (
        <input 
        onChange={(e) => props.handleUpload(e.target.files[0])}
        ref={(input) => { fileInput = input }}
        accept={acceptedTypes}
        type="file" 
        name="myfile" />
    )

    return (
        <div className="form-control form__upload-control">
            <div className="form__upload-wrapper">
                {button}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {uploadHint}
                {input}
                {inputHint}
            </div>
        </div>
    )

}

export default Upload;