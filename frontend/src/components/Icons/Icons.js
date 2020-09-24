import React from 'react';
import { FaInstagramSquare,FaFacebookSquare,FaTwitterSquare,FaLinkedin} from 'react-icons/fa';
import classes from './Icons.module.css';

const Icon =() =>{
    return <div style={{marginRight:"70%"}}>
        <FaInstagramSquare  size="1.7rem" className={classes.Icon}/>
        <FaFacebookSquare  size="1.7rem" className={classes.Icon}/>
        <FaTwitterSquare  size="1.7rem" className={classes.Icon}/>
        <FaLinkedin  size="1.7rem" className={classes.Icon}/>
    </div> 
}

export default Icon;