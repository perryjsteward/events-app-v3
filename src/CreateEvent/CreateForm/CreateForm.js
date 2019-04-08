import React, { Component } from 'react'
import CreateFormControls from '../CreateFormControls/CreateFormControls';
import { formRules, inputValidation, formValidation } from '../../_utils/formUtils';
import Input from '../../_shared/Input/Input';
import Upload from '../../_shared/Upload/Upload';
import formInputs from './formInputs';


import './CreateForm.scss';
export default class CreateForm extends Component {
  state = {
      createForm: formInputs,
      formIsValid: false
  }

  handleUserInput = (value, name) => {
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
            onChange={(e) => this.handleUserInput(e.target.value, el.name)}
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

  checkForm = () =>{
      console.log(this.state)
  }

  setUploadElement = (el) => {
    return (
        <Upload
            // acceptedTypes={el.acceptedTypes}
            fileName={el.value.name}
            hint={el.hint}
            handleUpload={(e) => this.handleUserInput(e, el.name)}
            hasStarted={el.hasStarted}
            isValid={el.isValid}>
        </Upload>
    );
  }

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
                isValid={this.state.formIsValid}>
            </CreateFormControls>
        </div>
    )
  }
}
