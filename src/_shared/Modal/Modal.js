import React from 'react';
import './Modal.scss';

const Modal = (props) => {
    let modalDisplay = 'hide'
    if(props.showModal){
        modalDisplay = 'show';
    }

    return (
        <div className={`modal__container ${modalDisplay}`}>
             <div 
                onClick={() => props.onCloseModal()}
                className={`modal__container-backdrop`}>
            </div>
            <div className={`modal__content`}>
                <span
                    onClick={() => props.onCloseModal()} 
                    className="fas fa-times modal__controls-icon">
                </span> 
                <div className="modal__content-child">
                    {props.children}
                </div>
            </div>
        </div>
       
        
    );
};

export default Modal;