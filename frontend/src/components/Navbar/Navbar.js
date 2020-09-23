import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Navbar.module.css';
// import './App.scss';
// import { Button,Navbar,Nav,FormControl,Form } from 'react-bootstrap';

  
const navbar = () =>{
    return <div className={classes.Navbar}>
         <a href="/alpha" style={{fontWeight:"bold",fontSize:"25px",marginTop: "-.6%"}}>Alpha</a>
         <a href="/home">Home</a>
         <a href="/deals">Today's Deals</a>
         <a href="#gifts">Gifts</a>
         <a href="#ideas">New Ideas</a>
         <input type="text" placeholder="Search"/>
         <button>Search</button>
    </div>
}
export default navbar;
 