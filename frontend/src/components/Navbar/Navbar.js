import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Navbar.module.css";

class NavbarPage extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
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
    return (
      <MDBNavbar
        dark
        expand="md"
        fixed="top"
        scrollingNavbarOffset
        className={classes.navcolor}
      >
        <MDBNavbarBrand>
          <strong className="white-text" style={{ fontFamily: "italic",color: "red" }}>
            $-"AlphaBits"
          </strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
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
                  <span className="mr-2">Dropdown</span>
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
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.signuped,
  };
};
export default connect(mapStateToProps)(withRouter(NavbarPage));
