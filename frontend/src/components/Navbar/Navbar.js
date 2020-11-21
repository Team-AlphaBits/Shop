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
  componentDidMount() {
    this.props.authCheckout();
    this.props.getCartData();
  }
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
    } else if (this.props.history.location.pathname === "/cart") {
      activeCart = true;
    }
    let fixed = null;
    if (this.props.fixed || this.props.width < 770 || this.props.show) {
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
        {this.props.fixed || this.props.width < 770 || this.props.show? (
          <MDBHamburgerToggler
            color="white"
            id="hamburger1"
            onClick={this.props.Toggle}
          />
        ) : null}
        <MDBNavbarNav className={classes.set1}>
          <h3 style={{ color: "white" }}>Hello, {this.props.name}</h3>
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
            <MDBNavLink
              to={this.props.isAuthenticated ? "/cart" : "/login"}
              className={classes.icon}
            >
              {window.innerWidth > 770 ? (
                <Badges
                  cart={
                    this.props.data
                      ? this.props.data.cartData.cart.cartlist
                      : null
                  }
                  cartLogin={
                    this.props.login ? this.props.login.cart.cartlist : null
                  }
                />
              ) : null}
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
            style={{ fontFamily: "italic", color: "red",fontSize: "26px",fontWeight: "bold" }}
            // style={{ fontFamily: "italic", color: "red", fontWeight: "600" }}
          >
            $-"AlphaBits"
          </strong>
        </MDBNavbarBrand>
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active={activeHome}>
              <MDBNavLink to="/" style={{fontWeight: "500",fontSize: "18px"}}>Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={activeDeal}>
              <MDBNavLink to="/deal" style={{fontWeight: "500",fontSize: "18px"}}>Today's Deals</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={activeGift}>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2" style={{fontWeight: "500",fontSize: "18px"}}>Categories</span>
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
              <MDBNavLink to="/cart" style={{fontWeight: "500",fontSize: "18px"}}>Cart</MDBNavLink>
            </MDBNavItem> :
            null}
            {this.props.isAuthenticated ?  
            <MDBNavItem active={activeCart}>
              <MDBNavLink to="/MyOrder" style={{fontWeight: "500",fontSize: "18px"}}>My Order</MDBNavLink>
            </MDBNavItem> :
            null}
            <MDBNavItem active={activeHome}>
              <MDBNavLink to="/about" style={{fontWeight: "500",fontSize: "18px"}}>About</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={activeLogin}>
              {this.props.isAuthenticated ? 
              <MDBNavLink onClick = {() => this.props.Logout()} to="/" style={{fontWeight: "500",fontSize: "18px"}}>Logout</MDBNavLink> : 
              <MDBNavLink to="/login" style={{fontWeight: "500",fontSize: "18px"}}>Login/Signup</MDBNavLink>}
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
    // if(this.props.width < 770){
    //   nav2 = null
    // }
    if (this.props.fixed || this.props.width < 770 || this.props.show) {
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
    opt: state.Login.desArr,
    isAuthenticated: state.Login.TokenId !== null,
    data: state.Login.Cart,
    login: state.Login.loginData,
    name: state.Login.name,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getResult: (des) => {
      dispatch(actions.getSearch(des));
    },
    Logout: () => {
      dispatch(actions.logOut());
    },
    getCartData: () => {
      dispatch(actions.getCart());
    },
    authCheckout: () => dispatch(actions.authCheckState()),
    userDetails: () => dispatch(actions.userDetails()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarPage));
