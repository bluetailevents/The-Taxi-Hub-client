import React from 'react'
import Modal from 'react-modal'

function VisualMnemonic({ Area, onClose }) {
    return (
        <Modal 
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Mnemonic Modal"
            className="modal"
            overlayClassName="overlay"
        >
            <button onClick={onClose}>Close</button>
            <div>{Area}</div>
        </Modal>
    )
}

export default VisualMnemonic
