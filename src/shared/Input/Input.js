import React from 'react';

const Input = (props) => {
    let inputLabel = '';
    let inputHint = '';

    if(props.label){
        inputLabel = (<label>{props.label}</label>);
    }

    if(props.hint){
        inputHint = (<div class="input__hint">{props.hint}</div>);
    }

    return (
        <React.Fragment>
            {inputLabel}
            <input
                type={props.type}
                placeholder={props.placeholder}
                disabled={props.disabled}
                required={props.required}
                >{props.children}
            </input>
            {inputHint}
        </React.Fragment>
    );
};

export default Input;