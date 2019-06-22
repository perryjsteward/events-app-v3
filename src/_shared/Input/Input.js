import React from 'react';

const Input = React.forwardRef((props, ref) => {
    let inputLabel = '';
    let inputHint = '';
    let inputPrefix = '';
    let inputType = '';
    let inputSuffix = '';

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

    if(props.prefix){
        classes.push('input__with-icon');
        inputPrefix = (
            <span className={"input__icon fas " + props.prefix}></span>
        );
    }

    if(props.value && !props.suffix) {
        classes.push('input__with-suffix');
        inputSuffix = (
            <span 
                onClick={() => props.clearInput()}
                className={"input__icon input__suffix fas fa-times"}>
            </span>
        );
    }

    if(props.suffix) {
        classes.push('input__with-suffix');
        inputSuffix = (
            <span 
                onClick={() => props.suffixMethod()}
                className={`input__icon input__suffix fas ${props.suffix}`}>
            </span>
        );
    }

    if(props.value){
        classes.push('hasInput');
    }

    if(!props.isValid && props.hasTriedSubmission){
        classes.push('invalid');
    }


    if(props.type !== 'textarea') {
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
    }

    if(props.type === 'textarea') {
        inputType = (
            <textarea
                rows='1'
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
            </textarea>
        );
    }




    return (
        <React.Fragment>
            {inputLabel}
            <div>
                {inputPrefix}
                {inputType}
                {inputSuffix}
            </div>
            {inputHint}
        </React.Fragment>
    );
});

export default Input;