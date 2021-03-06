import { formRules } from '../../_utils/formUtils';
import React from 'react';

export const formInputs = [
    {
        name: 'upload_file',
        type: 'file',
        value: '',
        hint: 'Make sure you upload a .jpg, .png or some other image type',
        acceptedTypes: ['image/*'],
        validation: {
            [formRules.isRequired]: false,
            [formRules.isAPhoto]: true,
        },
        isValid: true,
        ref: React.createRef()
    },
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
        isValid: false,
        ref: React.createRef()
    },
    {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        placeholder: 'e.g. This weekend i\'m going to host at mine...',
        value: '',
        validation: {
            [formRules.isRequired]: false,
        },
        isValid: true,
        ref: React.createRef()
    },
    {
        name: 'start_date',
        type: 'date',
        label: 'Start Date',
        placeholder: 'What day',
        group: 1,
        position: 1,
        hint: 'The date must be in the future',
        min: new Date().toISOString().split('T')[0],
        value: '',
        validation: {
            [formRules.isRequired]: true,
            [formRules.isAtLeastToday]: true //not implemented yet
        },
        isValid: false,
        ref: React.createRef()
    },
    {
        name: 'start_time',
        type: 'time',
        label: 'Start Time',
        placeholder: 'What time',
        group: 1,
        position: 2,
        value: '',
        hint: 'The time must be in the future',
        validation: {
            [formRules.isRequired]: false,
            [formRules.isAtLeastNow]: true, //not implemented yet
        },
        isValid: true,
        ref: React.createRef()
    },
    {
        name: 'end_date',
        type: 'date',
        label: 'End Date',
        placeholder: 'What day',
        group: 2,
        position: 1,
        value: '',
        hint: 'Make sure this is after your start date',
        min: new Date().toISOString().split('T')[0],
        validation: {
            [formRules.isRequired]: false,
            [formRules.isGreaterThanOrEqualToStartDate]: true
        },
        isValid: true,
        ref: React.createRef()
    },
    {
        name: 'end_time',
        type: 'time',
        label: 'End Time',
        placeholder: 'What time',
        inline: true,
        group: 2,
        position: 2,
        hint: 'Make sure this is after your start date time',
        value: '',
        validation: {
            [formRules.isRequired]: false,
            [formRules.isGreaterThanOrEqualToStartDateTime]: true,
        },
        isValid: true,
        ref: React.createRef()
    },
  ];

export default formInputs;