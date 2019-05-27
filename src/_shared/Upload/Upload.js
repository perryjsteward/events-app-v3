import React from 'react';
import Button from '../../_shared/Button/Button';

// state
import { connect } from 'react-redux';

const Upload = (props) => {

    let fileInput = null;
    let inputHint = '';
    let type = '';
    let uploadHint = '';
    const acceptedTypes = props.acceptedTypes ? props.acceptedTypes.join('') : null;

    if(props.isUploading) {
        uploadHint = (
            <i className="upload-icon loading fas fa-spinner fa-pulse"></i>
        );
    }

    if(props.file && !props.isUploading) {
        uploadHint = (
            <i className="upload-icon success far fa-check-circle"></i>
        );
    }

    if(props.imageError && !props.isUploading) {
        uploadHint = (
            <i className="upload-icon error far fa-times-circle"></i>
        );
    }

    const handleClick = () => fileInput.click();

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

    const button = (
        <Button
            type={type}
            onClick={handleClick}
            size="small" 
            outline>
            Upload a photo
        </Button>
    )

    const input = (
        <input 
            onChange={(e) => props.validateFile(e.target.files[0])}
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

const mapStateToProps = state => {
    return {
        error: state.imageError,
        isUploading: state.isImageUploading,
    };
  };

export default connect( mapStateToProps )(Upload);

