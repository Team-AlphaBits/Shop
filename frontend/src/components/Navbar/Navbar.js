import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Navbar.module.css';
// import './App.scss';
import { Button,Navbar,Nav,FormControl,Form } from 'react-bootstrap';

  
const navbar = () =>{
    return <Navbar bg="#FFFFFF" variant="white">
          <Navbar.Brand href="#home" className={classes.Navbar}>Alphas</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home" className={classes.Navbar}>Home</Nav.Link>
            <Nav.Link href="#features" className={classes.Navbar}>Features</Nav.Link>
            <Nav.Link href="#pricing" className={classes.Navbar}>Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
         </Navbar>
}
export default navbar;
 