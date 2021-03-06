import React from 'react';
import './Modal.scss';

const Modal = (props) => {
    
    let modalDisplay = 'hide'
    if(props.showModal){
        modalDisplay = 'show';
    }

    const onClickEvent = e => {
        // console.log(e.target)
    }

    return (
        <div className={`modal__container ${modalDisplay}`}>
            <div 
                onClick={e => onClickEvent(e)} 
                className={`modal__container-backdrop`}>
     
                <div className="modal__content-wrapper-1">
                    <div className="modal__content-wrapper-2">
                        <div
                            id="modal" 
                            className={`modal__content`}>
                            <span
                                onClick={() => props.onCloseModal()} 
                                className="fas fa-times modal__controls-icon">
                            </span> 
                            <div className="modal__content-child">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
       
        
    );
};

export default Modal;