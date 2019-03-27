
export const inputValidation = (value, rules, form) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.atLeastToday) {
        var today = new Date().toISOString().split('T')[0];
        isValid = value >= today && isValid;
    }

    if(rules.atLeastNow) {
        // if start date entered merge with time entered
        // else merge with todays date
        // check if merged date time > now()
    }

    if(rules.greaterOrEqualStartDate) {
        // if start date entered use for comparison
        // else use todays date
        // check if merged date date >= now()
    }

    if(rules.greaterOrEqualStartDateTime) {
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