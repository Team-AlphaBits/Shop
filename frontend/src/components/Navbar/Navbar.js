import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Navbar.module.css';
import DrawerIcon from '../Icons/DrawerIcon';
import Aux from '../../Hoc/Auxiliary/Auxiliary';
import NavigationItem from './Navlink/NavigationItem';
// import './App.scss';
// import { Button,Navbar,Nav,FormControl,Form } from 'react-bootstrap';

  
const navbar = (props) =>{
    return <div className={classes.Navbar}>
        <Aux>
        <a href="/alpha" style={{fontWeight:"bold",fontSize:"25px",marginTop: "-.6%"}}>Alpha</a>
         <NavigationItem link="/">Home</NavigationItem>
         <NavigationItem link="/deal">Today's Deals</NavigationItem>
         <NavigationItem link="/gifts">Gifts</NavigationItem>
         <NavigationItem link="/ideas">New Ideas</NavigationItem>
         <NavigationItem link="/login">Login/Signup</NavigationItem>
        </Aux>
         <input type="text" placeholder="Search"/>
         <button>Search</button>
         <DrawerIcon toggleDrawer = {props.Toggle}/>
    </div>
}
export default navbar;
 