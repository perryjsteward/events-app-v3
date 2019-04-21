import React from 'react';
import Button from '../../_shared/Button/Button';

// state
import { connect } from 'react-redux';

const Upload = (props) => {

    let fileInput = null;
    let inputHint = '';
    let type = '';
    const acceptedTypes = props.acceptedTypes ? props.acceptedTypes.join('') : null;

    let uploadHint = props.file ? props.file.name : 'Upload a photo';
    uploadHint = props.isUploading ? 'Uploading...' : uploadHint;
    uploadHint = props.imageError ? 'Something went wrong :(' : uploadHint;

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
            Browse files
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

