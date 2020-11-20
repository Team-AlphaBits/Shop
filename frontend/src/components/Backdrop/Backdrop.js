import React from 'react'
import classes from './Backdrop.module.css'
const Backdrop = (props) =>{
    return(
        <div className={classes.body} onClick={props.modalclosed}>

        </div>
    )
}
export default Backdrop;