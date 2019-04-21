import React, { Component } from 'react'
import CreateFormControls from '../CreateFormControls/CreateFormControls';
import { formRules, inputValidation, formValidation } from '../../_utils/formUtils';
import Input from '../../_shared/Input/Input';
import Upload from '../../_shared/Upload/Upload';
import formInputs from './formInputs';

// state
import * as actions from '../../_store/actions';
import { connect } from 'react-redux';

import './CreateForm.scss';
class CreateForm extends Component {
  state = {
      createForm: formInputs,
      formIsValid: false
  }

  validateUserInput = (value, name) => {
    let currForm = [ ...this.state.createForm ]; // create a copy
    // update element and check validitiy
    let newForm = currForm.map(el => {
        if(el.name === name){
            return {
                ...el,
                 value: value,
                 isValid: inputValidation(value, el.validation, currForm),
                 hasStarted: true
            }
        }
        return el;
    })

    // upload image - might want to move this later
    const found = newForm.find(el => el.name === 'upload_file');
    if(name === 'upload_file' && value && found.isValid){
        this.props.onImageUpload(value);
    }

    // set new form and check form validity
    this.setState({ 
        createForm: newForm,
        formIsValid: formValidation(newForm)
    });
  }

  setInputElement = (el) => {
    let element = (
        <Input
            key={el.name}
            value={el.value}
            onChange={(e) => this.validateUserInput(e.target.value, el.name)}
            required={el.validation[formRules.isRequired]}
            type={el.type} 
            label={el.label}
            hint={el.hint}
            min={el.min}
            hasStarted={el.hasStarted}
            isValid={el.isValid}
            placeholder={el.placeholder}/>
    );
    // return it with group & position info
    return {
        element: element,
        group: el.group,
        position: el.position
    }; 
  }

  setGroupElements = (arr) => {
        return (
            <div className="form-control">
                { arr.map(el => (
                    <div 
                        key={el.position} 
                        className="inline">
                        {el.element}
                    </div>
                )) }
            </div>
        );
  }

  setUploadElement = (el) => {
    return (
        <Upload
            acceptedTypes={el.acceptedTypes}
            file={el.value}
            hint={el.hint}
            validateFile={(e) => this.validateUserInput(e, el.name)}
            hasStarted={el.hasStarted}
            isValid={el.isValid}>
        </Upload>
    );
  }

  //check to see if image was uploaded with success
  isFormValid = () => {
    // return false;
    const found = this.state.createForm.find(el => el.name === 'upload_file');
    if(!found.value && this.state.formIsValid) {
        return true;
    }

    if(found.value && this.props.hasImageUploaded && this.state.formIsValid){
        return true
    }
    return false;
  };

  handleReset = () => {
    let currForm = [ ...this.state.createForm ];
    const resetValue = '';
    let newForm = currForm.map(el => {
        return {
            ...el,
            value: resetValue,
            isValid: inputValidation(resetValue, el.validation),
            hasStarted: false
        }
    });
    this.setState({
        createForm: newForm,
        formIsValid: formValidation(newForm)
    });
  }

  render() {
    let currForm = [ ...this.state.createForm ];

    let allInputs = currForm
        .filter(el => el.type !== 'file')
        .map(el => this.setInputElement(el))

    let groupOneInputs = allInputs
        .filter(el => !el.group && el.type !== 'file')
        .reduce((acc, curr) => acc.concat(curr.element),[])

    let uploadElement = this.setUploadElement(
        currForm.filter(el => el.type === 'file')[0]
    ); 

    let groupTwoInputs = this.setGroupElements(
        allInputs.filter(el => el.group === 1)
    );

    let groupThreeInputs = this.setGroupElements(
        allInputs.filter(el => el.group === 2)
    );


    return (
        <div className='create-form__container'>
            <div className="create-form__content">
                <h4 onClick={this.checkForm}>Create an Event</h4>
                <p>Pop your event information here and get your free page to share with friends and family.</p>
                <br/>
                {uploadElement}
                {groupOneInputs}
                {groupTwoInputs}
                {groupThreeInputs}
            </div>
            <CreateFormControls
                onSubmit={() => this.props.onSubmit(this.state.createForm)}
                onReset={this.handleReset}
                isValid={this.isFormValid()}>
            </CreateFormControls>
        </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        error: state.imageUploadError,
        hasImageUploaded: state.hasImageUploaded,
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onImageUpload: (image) => dispatch( actions.uploadImage(image) )
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )(CreateForm);
