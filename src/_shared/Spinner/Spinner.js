import React from 'react';
import './Spinner.scss';
import { connect } from 'react-redux';

const Spinner = (props) => {
    let spinner = (
        <React.Fragment>
            <div className="white-overlay"></div>
            <div className="ball-loader">
                <div className="ball-loader-ball ball1"></div>
                <div className="ball-loader-ball ball2"></div>
                <div className="ball-loader-ball ball3"></div>
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {props.isLoading ? spinner : ''}
        </React.Fragment>
    );
};



const mapStateToProps = state => {
    return {
        isLoading: state.isLoading
    };
};
  

export default connect( mapStateToProps )(Spinner);