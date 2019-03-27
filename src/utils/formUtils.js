
export const formRules = {
    isRequired: 'REQUIRED',
    isAtLeastNow: 'IS_AT_LEAST_NOW',
    isAtLeastToday: 'IS_AT_LEAST_TODAY',
    isGreaterThanOrEqualToStartDate: 'IS_GREATER_THAN_OR_EQUAL_TO_START_DATE',
    isGreaterThanOrEqualToStartDateTime: 'IS_GREATER_THAN_OR_EQUAL_TO_START_DATE_TIME'
}

export const inputValidation = (value, rules, form) => {
    let isValid = true;
    console.log(rules)
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

    if(rules[formRules.isAtLeastNow]) {
        // if start date entered merge with time entered
        // else merge with todays date
        // check if merged date time > now()
    }

    if(rules[formRules.isGreaterThanOrEqualStartDate]) {
        // if start date entered use for comparison
        // else use todays date
        // check if merged date date >= now()
    }

    if(rules[formRules.isGreaterThanOrEqualStartDateTime]) {
        // if start date and time entered merge for comparison
        // else if date is today use now() as time
        // else use 00:00 as time
        // if end date entered merge merge with time
        // else use start date for comparison
        // see if start date time is > end date time
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