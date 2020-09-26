import React from 'react';
import classes from './Sidedrawer.module.css';

const Sidedrawer = (props) =>{
    let drawer = [classes.Sidedrawer,classes.Open];
    if(!props.show){
        drawer = [classes.Sidedrawer,classes.Close]
    }
    return <div className={drawer.join(' ')} onClick={props.Toggle}></div>
}
export default Sidedrawer;