export const formRules = {
    isRequired: 'REQUIRED',
    isAPhoto: 'IS_A_PHOTO',
    isAtLeastNow: 'IS_AT_LEAST_NOW',
    isAtLeastToday: 'IS_AT_LEAST_TODAY',
    isStartTimeIfThereIsEndTime: 'IS_START_TIME_IF_THERE_IS_END_TIME',
    isGreaterThanOrEqualToStartDate: 'IS_GREATER_THAN_OR_EQUAL_TO_START_DATE',
    isGreaterThanOrEqualToStartDateTime: 'IS_GREATER_THAN_OR_EQUAL_TO_START_DATE_TIME'
}

export const inputValidation = (value, rules, form) => {
    let isValid = true;
    
    if (!rules) {
        return true;
    }

    if (rules[formRules.isRequired]) {
        isValid = value.trim() !== '' && isValid;
    }

    if(rules[formRules.isAtLeastToday]) {
        var today = new Date().toISOString().split('T')[0];
        isValid = value >= today && isValid;
    }

    if(rules[formRules.isAPhoto]) {
        let type = value.type ? value.type.split('/') : [];
        isValid = type[0] === 'image' && isValid;
    }

    if(rules[formRules.isAtLeastNow]) {
        // if start date entered merge with time entered
        // else merge with todays date
        // check if merged date time > now()
    }

    if(rules[formRules.isStartTimeIfThereIsEndTime]) {
        const end_time = findFormInputByID('end_time', form);
        if(end_time.value && !value) {
            isValid = false && isValid;
        }
    }


    if(rules[formRules.isGreaterThanOrEqualToStartDate]) {
        const start_date = findFormInputByID('start_date', form);
        if(value && start_date) {
            isValid = value >= start_date.value && isValid;
        }
    }

    if(rules[formRules.isGreaterThanOrEqualToStartDateTime]) {
        const start_date = findFormInputByID('start_date', form);
        const start_time = findFormInputByID('start_time', form);
        let end_date = findFormInputByID('end_date', form);


        console.log(start_date.value, start_time.value)
        console.log(end_date.value, value)

        if(value && end_date.value && end_date.value === start_date.value){
            isValid = value > start_time.value && isValid;
        } 

        if(value && end_date.value && end_date.value > start_date.value){
            isValid = true && isValid;
        } 

        if(value && !end_date.value){
            isValid = value > start_time.value && isValid;
        }
        
    }

    return isValid;
};

export const formValidation = (form) => {
    let isValid = true;
    form.forEach(el => {
        isValid = el.isValid && isValid;
    });
    return isValid;
};

const findFormInputByID = (id, form) => {
    return form.filter(el => el.name === id)[0];
}