import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';
const Modal = (props) =>{
    return(
        <div>
            <Backdrop modalclosed={props.modalclosed} />
             <div className={classes.Modal}
        style={{
            transform: true ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: true ? '1' : '0'
        }}>
           <h3 style={{color: "white"}}>{props.children}</h3>
        </div>
        </div>
    )
}
export default Modal;