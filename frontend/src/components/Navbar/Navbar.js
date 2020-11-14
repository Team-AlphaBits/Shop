import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBHamburgerToggler,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCol,
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Navbar.module.css";
import * as actions from "../../Store/Action/index";
import Badges from "../Badge/Badges";
// import Dicon from '../SideDrawer/DrawerIcon/DrawerIcon'

class NavbarPage extends Component {
  state = {
    isOpen: false,
    Input: "",
  };
  InputChangeHandler = (event) => {
    this.setState({
      Input: event.target.value,
    });
  };
  searchResult = (event) => {
    event.preventDefault();
    this.props.getResult(this.state.Input);
    this.props.history.push({
      pathname: "/ProductList/RelatedItems/false",
    });
  };
  //onSubmit={() => this.props.getResult(this.state.Input)}
  render() {
    let filterArr = [];
    const options = [];
    if (this.props.opt) {
      filterArr = this.props.opt.filter((ele) => {
        return ele
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(this.state.Input.toLowerCase().replace(/\s+/g, ""));
      });
      for (let i = 0; i < 5 && i < filterArr.length; i++) {
        options.push(<option value={filterArr[i]}></option>);
      }
    }
    let activeHome = false,
      activeDeal = false,
      activeGift = false,
      activeLogin = false,
      activeCart = false;

    if (this.props.history.location.pathname === "/login") {
      activeLogin = true;
    } else if (this.props.history.location.pathname === "/") {
      activeHome = true;
    } else if (this.props.history.location.pathname === "/deal") {
      activeDeal = true;
    } else if (this.props.history.location.pathname === "/gifts") {
      activeGift = true;
    }else if (this.props.history.location.pathname === "/cart") {
      activeCart = true;
    }
    let fixed = null;
    if (this.props.fixed || this.props.width < 770) {
      fixed = "top";
    }
    const nav1 = (
      <MDBNavbar
        dark
        expand="md"
        scrollingNavbarOffset
        fixed={fixed}
        className={classes.nav1}
      >
        {this.props.fixed || this.props.width < 770 ? (
          <MDBHamburgerToggler
            color="white"
            id="hamburger1"
            onClick={this.props.Toggle}
          />
        ) : null}
        <MDBNavbarNav className={classes.set1}>
          <h3 style={{ color: "white" }}>Hello User</h3>
          <MDBCol md="6" className={classes.set2}>
            <form onSubmit={this.searchResult}>
              <input
                className="form-control"
                type="text"
                value={this.state.Input}
                onChange={this.InputChangeHandler}
                placeholder="Search"
                aria-label="Search"
                list="show"
              />
              <datalist id="show">{options}</datalist>
              <button style={{ display: "none" }} type="submit"></button>
            </form>
          </MDBCol>
          <MDBNavItem active={activeLogin}>
            <MDBNavLink to="/Cart" className={classes.icon}>
              <Badges />
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBNavbar>
    );
    let nav2 = (
      <MDBNavbar dark expand="md" className={classes.navcolor2}>
        <MDBNavbarBrand>
          <strong
            className="white-text"
            style={{ fontFamily: "italic", color: "red" }}
          >
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
                  <MDBDropdownItem href="/ProductList/Electronics/true">
                    Electronics
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/ProductList/Clothings/true">
                    Clothing
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/ProductList/Video_Games/true">
                    Games
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/ProductList/Books/true">
                    Books
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/ProductList/Sports/true">
                    Sports
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/ProductList/Computer&peripheral/true">
                    Computers & Accessories
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/ProductList/Mobiles/true">
                    Mobiles
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/ProductList/Decoration/true">
                    Decoration
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            {this.props.isAuthenticated ?  
            <MDBNavItem active={activeCart}>
              <MDBNavLink to="/cart">Cart</MDBNavLink>
            </MDBNavItem> :
            null}
            <MDBNavItem active={activeLogin}>
              {this.props.isAuthenticated ? 
              <MDBNavLink onClick = {() => this.props.Logout()} to="/">Logout</MDBNavLink> : 
              <MDBNavLink to="/login">Login/Signup</MDBNavLink>}
            </MDBNavItem>
            <MDBNavItem active={activeLogin}>
              <MDBNavLink to="/MyOrder">My Order</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
    // if(this.props.width < 770){
    //   nav2 = null
    // }
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
    opt: state.Login.desArr,
    isAuthenticated: state.Login.TokenId !== null
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getResult: (des) => {
      dispatch(actions.getSearch(des));
    },
    Logout: () => {
      dispatch(actions.logOut())
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarPage));
