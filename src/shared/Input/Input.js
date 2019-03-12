import React from 'react';

const Input = (props) => {
    let inputLabel = '';
    let inputHint = '';
    let inputIcon = '';

    let classes = [];
    
    if(props.label){
        inputLabel = (
            <label>
                {props.label}
                <span className="input__label-required">
                    {props.required ? '*' : null}
                </span>
            </label>
        );
    }

    if(props.hint){
        inputHint = (<div class="input__hint">{props.hint}</div>);
    }

    if(props.icon){
        classes.push('input__with-icon');
        inputIcon = (<span className={"input__icon fas " + props.icon}></span>);
    }

    return (
        <React.Fragment>
            {inputLabel}
            <div>
                {inputIcon}
                <input
                    className={classes.join(' ')}
                    type={props.type}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    required={props.required}>
                    {props.children}
                </input>
            </div>
            {inputHint}
        </React.Fragment>
    );
};

export default Input;