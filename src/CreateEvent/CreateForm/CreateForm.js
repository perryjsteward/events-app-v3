import React, { Component } from 'react'
import CreateFormControls from '../CreateFormControls/CreateFormControls';
import { formRules, inputValidation, formValidation } from '../../_utils/formUtils';
import Input from '../../_shared/Input/Input';
import Upload from '../../_shared/Upload/Upload';
import Alert from '../../_shared/Alert/Alert';
import formInputs from './formInputs';
import ReactGA from 'react-ga';

// state
import * as actions from '../../_store/actions';
import { connect } from 'react-redux';

import './CreateForm.scss';
class CreateForm extends Component {
  state = {
      createForm: formInputs,
      formIsValid: false,
      hasTriedSubmission: false
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

    let validatedForm = newForm.map(el => {
        if(el.hasStarted && el.name !== name){
            return {
                ...el,
                 isValid: inputValidation(el.value, el.validation, newForm)
            }
        }
        return el;
    })

    // set new form and check form validity
    this.setState({ 
        createForm: validatedForm,
        formIsValid: formValidation(validatedForm)
    });
  }
 

  setInputElement = (el) => {
    let element = (
        <Input
            ref={(input) => el.ref = input}
            key={el.name}
            value={el.value}
            clearInput={() => {
                this.validateUserInput('', el.name);
                el.ref.focus();
            }}
            onChange={(e) => this.validateUserInput(e.target.value, el.name)}
            required={el.validation[formRules.isRequired]}
            type={el.type} 
            label={el.label}
            hint={el.hint}
            min={el.min}
            hasTriedSubmission={this.state.hasTriedSubmission}
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
    ReactGA.event({
        category: 'Create Event',
        action: 'Reset Form'
    });
  }

  setAlertElement = () => {
      if(this.props.imageError || this.props.createError){
          return <Alert></Alert>;
      } else {
          return '';
      }
  }

  onSubmit = () => {
    if(this.isFormValid()){
        this.props.onSubmit(this.state.createForm);
        ReactGA.event({
            category: 'Create Event',
            action: 'Submitted Form'
        });
    } else {
        this.setState({
            hasTriedSubmission: true
        });
        this.focusOnInput();
    }
  }

  focusOnInput = () => {
    let currForm = [ ...this.state.createForm ];
    let element = currForm.filter(el => {
        return el.validation[formRules.isRequired] && !el.isValid;
    })[0];
    if(element){
        element.ref.current.focus();
    }
  }

  setDefaultValues = (currForm, event) => {
      console.log(event)
    // if(event){
    //     return currForm.map(el => {
    //         return {
    //             ...el,
    //             value: event[el.name]
    //         };
    //     });
    // } else {
        return currForm;
    // }
  }

  render() {
    const createForm = [ ...this.state.createForm ]
    let currForm = this.setDefaultValues(createForm, this.props.event);

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

    let alertElement = this.setAlertElement();


    return (
        <div className='create-form__container'>
            <div className="create-form__content">
                <h4 onClick={this.checkForm}>Create an Event</h4>
                <p>Pop your event information here and get your free page to share with friends and family.</p>
                {alertElement}
                {uploadElement}
                {groupOneInputs}
                {groupTwoInputs}
                {groupThreeInputs}
            </div>
            <CreateFormControls
                onSubmit={() => this.onSubmit()}
                onReset={this.handleReset}
                isValid={this.isFormValid()}>
            </CreateFormControls>
        </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        imageError: state.imageUploadError,
        createError: state.createError,
        hasImageUploaded: state.hasImageUploaded,
        selectedLocation: state.selectedLocation
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onImageUpload: (image) => dispatch( actions.uploadImage(image) )
    };
};
  
export default connect( mapStateToProps, mapDispatchToProps )(CreateForm);
