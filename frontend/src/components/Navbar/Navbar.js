import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBHamburgerToggler,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,MDBCol
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Navbar.module.css";
// import Dicon from '../SideDrawer/DrawerIcon/DrawerIcon'

class NavbarPage extends Component {
  state = {
    isOpen: false,
  };

  render() {
    let activeHome = false,
      activeDeal = false,
      activeGift = false,
      activeLogin = false;

    if (this.props.history.location.pathname === "/login") {
      activeLogin = true;
    } else if (this.props.history.location.pathname === "/") {
      activeHome = true;
    } else if (this.props.history.location.pathname === "/deal") {
      activeDeal = true;
    } else if (this.props.history.location.pathname === "/gifts") {
      activeGift = true;
    }
    let fixed = null
    if(this.props.fixed || this.props.width < 770){
      fixed = "top"
    }
    const nav1 =
     <MDBNavbar 
     dark 
     expand="md" 
    scrollingNavbarOffset
    fixed={fixed}
     className={classes.nav1}>
          {this.props.fixed || this.props.width<770 ? <MDBHamburgerToggler color="white" id="hamburger1" onClick={this.props.Toggle}/> : null}
          <MDBNavbarNav  className={classes.set1}>
       <h3 style={{color: "white"}}>Hello User</h3>
          <MDBCol md="6"  className={classes.set2}>
      <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
    </MDBCol>
          </MDBNavbarNav>
      </MDBNavbar>
    let nav2 =  <MDBNavbar
    dark
    expand="md"
    className={classes.navcolor2}
  >
    <MDBNavbarBrand>
      <strong className="white-text" style={{ fontFamily: "italic",color: "red" }}>
        $-"AlphaBits"
      </strong>
    </MDBNavbarBrand>
    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
      <MDBNavbarNav left>
        <MDBNavItem active={activeHome}>
          <MDBNavLink to="/">Home</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem active={activeDeal}>
          <MDBNavLink to="/deal">Today's Deals</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem active={activeGift}>
        <MDBDropdown>
            <MDBDropdownToggle nav caret>
              <span className="mr-2">Categories</span>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem href="#!">Electronics</MDBDropdownItem>
              <MDBDropdownItem href="#!">Clothing</MDBDropdownItem>
              <MDBDropdownItem href="#!">Games</MDBDropdownItem>
              <MDBDropdownItem href="#!">Books</MDBDropdownItem>
              <MDBDropdownItem href="#!">Sports</MDBDropdownItem>
              <MDBDropdownItem href="#!">Computers & Accessories</MDBDropdownItem>
              <MDBDropdownItem href="#!">Mobiles</MDBDropdownItem>
              <MDBDropdownItem href="#!">Decoration</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>
        <MDBNavItem active={activeLogin}>
          <MDBNavLink to="/login">Login/Signup</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
  if(this.props.width < 770){
    nav2 = null
  }
    return (
     <>
     {nav2}
     {nav1}
     </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.signuped,
  };
};
export default connect(mapStateToProps)(withRouter(NavbarPage));
