import React from 'react';
import classes from './SideDrawer.module.css'
import Backdrop from '../Backdrop/Backdrop'

const SideDrawer = (props) =>{
    let sideClass = [classes.body,classes.Close];
    let backdrop = null
    if(props.show){
        sideClass = [classes.body,classes.Open]
        backdrop = <Backdrop />
    }
    return(
        <div>
           {backdrop}
         <div className={sideClass.join(' ')}>
        </div>
        </div>
    )
}
export default SideDrawer;