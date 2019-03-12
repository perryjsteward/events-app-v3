import React from 'react';

// available css classes for size
const btnSizes = {
    xsmall : 'btn-xs',
    small : 'btn-sm',
    medium : 'btn-md',
    large : 'btn-lg',
    xlarge : 'btn-xl',
}

// available css classes for type
const btnTypes = {
    primary : 'primary',
    success : 'success',
    warning: 'warning',
    link: 'link'
}

const Button = (props) => {

    const classes = [
        ...((props.outline) ? ['outline'] : []),
        ...((btnSizes[props.size]) ? [btnSizes[props.size]] : []),
        ...((btnTypes[props.type]) ? [btnTypes[props.type]] : [])
    ];

    return (
        <button
            onClick={props.onClick}
            className={classes.join(' ')}
            disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default Button;