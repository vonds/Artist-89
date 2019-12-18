import React from 'react'
import ReactDOM from 'react-dom'


const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="modal-dialog" role="document">
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal-content visible active">
                <div className="modal-title">{props.title}</div>
                <div className="modal-body">{props.content}</div>
                <div className="modal-footer">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}



export default Modal