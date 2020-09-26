import React from 'react';
import Icon from './Icons';
import { HiMail } from "react-icons/hi";
import classes from './headers.module.css';

const Head = () =>{
    return <div className={classes.headers}>
       <Icon />
       <span  className={classes.mail}>
       <HiMail size="1.7rem" color="#ff8800"/>
       <p>shopwithus@Alphabits.com</p>
       </span>
    </div>
}
export default Head;