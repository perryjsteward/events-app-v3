import React, { Component } from 'react'
import CreateFormControls from '../CreateFormControls/CreateFormControls';
import './CreateForm.scss';

import Input from '../../shared/Input/Input';
// import Upload from '../../shared/Upload/Upload';

export default class CreateForm extends Component {
  state = {
      createForm: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Event name',
            placeholder: 'e.g. My Birthday Party',
        },
        {
            name: 'description',
            type: 'text',
            label: 'Description',
            placeholder: 'e.g. This weekend i\'m going to host at mine...',
            required: false,
        },
        {
            name: 'start_date',
            type: 'date',
            label: 'Start Date',
            required: true,
            group: 1,
            position: 1
        },
        {
            name: 'start_time',
            type: 'time',
            label: 'End Time',
            required: false,
            group: 1,
            position: 2
        },
        {
            name: 'end_date',
            type: 'date',
            label: 'End Date',
            required: false,
            group: 2,
            position: 1
        },
        {
            name: 'end_time',
            type: 'time',
            label: 'End Time',
            required: false,
            inline: true,
            group: 2,
            position: 2
        },
      ]
      
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  setInputElement (el){
    let element = (
        <Input
            key={el.name}
            required={el.required}
            type={el.type} 
            label={el.label}
            placeholder={el.placeholder}/>
    );
    // return it with group & position info
    return {
        element: element,
        group: el.group,
        position: el.position
    }; 
  }

  setGroupElements(arr) {
        console.log(arr)
        return (
            <div className="form-control">
                { 
                    arr.map(el => {
                        return (
                            <div key={el.position} className="inline">
                                {el.element}
                            </div>
                        );
                    }) 
                }
            </div>
        );
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
            <h4>Create an Event</h4>
            <p>Pop your event information here and get your free page to share with friends and family.</p>
            <br/>
            {groupOneInputs}
            {groupTwoInputs}
            {groupThreeInputs}
        </div>
        <CreateFormControls></CreateFormControls>
    </div>
    )
  }
}
