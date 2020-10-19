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
} from "mdbreact";
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';

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
        color="blue"
        dark
        expand="md"
        fixed="top"
        scrollingNavbarOffset
      >
        <MDBNavbarBrand>
          <strong className="white-text" style={{ fontFamily: "italic" }}>
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
              <MDBNavLink to="/gifts">Gifts Ideas</MDBNavLink>
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
const mapStateToProps = (state) =>{
  return{
    isAuth: state.signuped
  }
}
export default connect(mapStateToProps)(withRouter(NavbarPage));
