import React from 'react';

const Input = React.forwardRef((props, ref) => {
    let inputLabel = '';
    let inputHint = '';
    let inputIcon = '';
    let inputType = '';

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

    if(props.hint && !props.isValid && (props.hasStarted || props.hasTriedSubmission)){
        inputHint = (
            <div className="input__hint">{props.hint}</div>
        );
    }

    if(props.icon){
        classes.push('input__with-icon');
        inputIcon = (
            <span className={"input__icon fas " + props.icon}></span>
        );
    }

    if(props.value){
        classes.push('hasInput');
    }

    if(!props.isValid && props.hasTriedSubmission){
        classes.push('invalid');
    }


    inputType = (
        <input
            ref={ref}
            id={props.id}
            onChange={(event) => props.onChange(event)}
            value={props.value}
            className={classes.join(' ')}
            type={props.type}
            min={props.min}
            placeholder={props.placeholder}
            disabled={props.disabled}>
            {props.children}
        </input>
    );

    return (
        <React.Fragment>
            {inputLabel}
            <div>
                {inputIcon}
                {inputType}
            </div>
            {inputHint}
        </React.Fragment>
    );
});

export default Input;