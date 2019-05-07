import React from 'react';
import './Alert.scss';

const Alert = () => {
    return (
        <React.Fragment>
            <div className="alert__container">
                <div className="alert__icon-container"></div>
                <div className="alert__content-container">
                    <div className="alert__title">
                        Something went wrong &nbsp; : (
                    </div>
                    <p>
                        It looks like we can't do that right now. Please come back later when we figure out our shit.
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Alert;