import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Navbar.module.css';
import DrawerIcon from '../Icons/DrawerIcon';
import Aux from '../../Hoc/Auxiliary/Auxiliary';
// import './App.scss';
// import { Button,Navbar,Nav,FormControl,Form } from 'react-bootstrap';

  
const navbar = (props) =>{
    return <div className={classes.Navbar}>
        <Aux>
        <a href="/alpha" style={{fontWeight:"bold",fontSize:"25px",marginTop: "-.6%"}}>Alpha</a>
         <a href="/">Home</a>
         <a href="/deal">Today's Deals</a>
         <a href="#gifts">Gifts</a>
         <a href="#ideas">New Ideas</a>
        </Aux>
         <input type="text" placeholder="Search"/>
         <button>Search</button>
         <DrawerIcon toggleDrawer = {props.Toggle}/>
    </div>
}
export default navbar;
 