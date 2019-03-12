
export const inputValidation = (value, rules) => {
    let isValid = true;

    if (!rules || !rules.required) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
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