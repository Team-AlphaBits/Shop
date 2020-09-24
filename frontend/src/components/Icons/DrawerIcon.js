import React from 'react';
import Aux from '../../Hoc/Auxiliary/Auxiliary';
import classes from './DrawerIcon.module.css';

const DrawerIcon = () =>{
    return <Aux>
        <ul className={classes.ul}>
            <li><div></div></li>
            <li><div></div></li>
            <li><div></div></li>
        </ul>
    </Aux>
}
export default DrawerIcon;