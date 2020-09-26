import React from 'react';
import Aux from '../../Hoc/Auxiliary/Auxiliary';
import classes from './DrawerIcon.module.css';

const DrawerIcon = (props) =>{
    let drawer = [classes.ul];
    if(props.show){
        drawer= [classes.ul, classes.some];
    }
    return <Aux>
        <ul className={drawer.join(' ')} onClick={props.toggleDrawer}>
            <li><div></div></li>
            <li><div></div></li>
            <li><div></div></li>
        </ul>
    </Aux>
}
export default DrawerIcon;