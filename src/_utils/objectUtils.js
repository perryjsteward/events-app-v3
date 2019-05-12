export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const trimText = text => {
    if(text){
        return `${text.substr(0, 250)}...`
    } else {
        return;
    }
}

export const removeCommas = text => {
    if(text){
        return text.replace(/,/g, '');
    } else {
        return;
    }
}