import React from 'react';

const Modal = ({ isOpen, closeModal, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <button onClick={closeModal}>Close Modal</button>
            </div>
        </div>
    );
};

export default Modal;