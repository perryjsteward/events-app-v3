import React, { Component } from 'react'
import CreateFormControls from '../CreateFormControls/CreateFormControls';
import './CreateForm.scss';
import { formRules, inputValidation, formValidation } from '../../utils/formUtils';

import Input from '../../shared/Input/Input';
// import Upload from '../../shared/Upload/Upload';

export default class CreateForm extends Component {
  state = {
      createForm: [
        {
            name: 'name',
            type: 'text',
            label: 'Event name',
            placeholder: 'e.g. My Birthday Party',
            hint: 'You must name your event something',
            value: '',
            validation: {
                [formRules.isRequired]: true,
            },
            isValid: false
        },
        {
            name: 'description',
            type: 'text',
            label: 'Description',
            placeholder: 'e.g. This weekend i\'m going to host at mine...',
            value: '',
            validation: {
                [formRules.isRequired]: false,
            },
            isValid: true
        },
        {
            name: 'start_date',
            type: 'date',
            label: 'Start Date',
            group: 1,
            position: 1,
            hint: 'The date must be in the future',
            min: new Date().toISOString().split('T')[0],
            value: '',
            validation: {
                [formRules.isRequired]: true,
                [formRules.isAtLeastToday]: true //not implemented yet
            },
            isValid: false
        },
        {
            name: 'start_time',
            type: 'time',
            label: 'Start Time',
            group: 1,
            position: 2,
            value: '',
            hint: 'The time must be in the future',
            validation: {
                [formRules.isRequired]: false,
                [formRules.isAtLeastNow]: true //not implemented yet
            },
            isValid: true
        },
        {
            name: 'end_date',
            type: 'date',
            label: 'End Date',
            group: 2,
            position: 1,
            value: '',
            min: new Date().toISOString().split('T')[0],
            validation: {
                [formRules.isRequired]: false,
                [formRules.isGreaterThanOrEqualStartDate]: true //not implemented yet
            },
            isValid: true
        },
        {
            name: 'end_time',
            type: 'time',
            label: 'End Time',
            inline: true,
            group: 2,
            position: 2,
            value: '',
            validation: {
                [formRules.isRequired]: false,
                [formRules.isGreaterThanOrEqualStartDateTime]: true,
            },
            isValid: true
        },
      ],
      formIsValid: false
  }

  handleUserInput = (e, name) => {
    let currForm = [ ...this.state.createForm ]; // create a copy
    // update element and check validitiy
    let newForm = currForm.map(el => {
        if(el.name === name){
            return {
                ...el,
                 value: e.target.value,
                 isValid: inputValidation(e.target.value, el.validation, currForm),
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

  checkForm = () => {
      console.log(this.state)
  }

  setInputElement = (el) => {
    let element = (
        <Input
            key={el.name}
            value={el.value}
            onChange={(e) => this.handleUserInput(e, el.name)}
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

  handleSubmit = () => {
    let currForm = [ ...this.state.createForm ];
    let formData = [];
    currForm.forEach(el => {
        if(el.value) formData[el.name] = el.value;
    })
    console.log(formData);
  }

  handleReset = () => {
    let currForm = [ ...this.state.createForm ];
    const resetValue = '';
    let newForm = currForm.map(el => {
        return {
            ...el,
            value: resetValue,
            isValid: inputValidation(resetValue, el.validation)
        }
    });
    this.setState({
        createForm: newForm,
        formIsValid: formValidation(newForm)
    });
  }

  render() {
    let allInputs = this.state.createForm
        .map(el => this.setInputElement(el))

    let groupOneInputs = allInputs
        .filter(el => !el.group)
        .reduce((acc, curr) => acc.concat(curr.element),[])

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
                {groupOneInputs}
                {groupTwoInputs}
                {groupThreeInputs}
            </div>
            <CreateFormControls
                onSubmit={this.handleSubmit}
                onReset={this.handleReset}
                isValid={this.state.formIsValid}>
            </CreateFormControls>
        </div>
    )
  }
}
