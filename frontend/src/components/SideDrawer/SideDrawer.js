import React, { Component } from "react";
import classes from "./SideDrawer.module.css";
import Backdrop from "../Backdrop/Backdrop";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import * as actions from "../../Store/Action/index";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Badges from "../Badge/Badges";

class SideDrawer extends Component {
    //  componentDidMount(){
    //   this.props.getCartData()
    //  }
  render() {
    let sideClass = [classes.body, classes.Close];
    let backdrop = null;
    if (this.props.show) {
      sideClass = [classes.body, classes.Open];
      backdrop = <Backdrop />;
    }
    let nav2;
    nav2 = (
      <ul className={classes.list}>
        <li>
          <strong
            className="white-text"
            style={{ fontFamily: "italic", fontSize: "28px", color: "red" }}
          >
            $-"AlphaBits"
          </strong>
        </li>
        <li className={classes.sidelink1}>
          <NavLink to="/cart">
            {" "}
            <Badges
              cart={
                this.props.data ? this.props.data.cartData.cart.cartlist : null
              }
              cartLogin={
                this.props.login ? this.props.login.cart.cartlist : null
              }
            />
          </NavLink>
        </li>
        <li className={classes.sidelink}>
          <NavLink to="/" activeClassName={classes.active} exact>
            Home
          </NavLink>
        </li>
        <li className={classes.sidelink}>
          <NavLink to="/deal" activeClassName={classes.active} exact>
            Today's Deals
          </NavLink>
        </li>
        <li>
          <MDBDropdown className={classes.sidelink}>
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
        </li>
        {this.props.isAuthenticated ? (
          <li className={classes.sidelink}>
            <NavLink to="/cart" activeClassName={classes.active} exact>
              Cart
            </NavLink>
          </li>
        ) : null}
        <li className={classes.sidelink}>
          <NavLink to="/about" activeClassName={classes.active} exact>
            About
          </NavLink>
        </li>
        {this.props.isAuthenticated ? (
          <li className={classes.sidelink}>
            <NavLink
              to="/MyOrder"
              exact
              activeClassName={classes.active}
              onClick={this.props.Toggle}
            >
              My Order
            </NavLink>
          </li>
        ) : null}
        {this.props.isAuthenticated ? (
          <li className={classes.sidelink}>
            <NavLink
              onClick={() => this.props.Logout()}
              to="/"
              exact
              activeClassName={classes.active}
            >
              Logout
            </NavLink>
          </li>
        ) : (
          <li className={classes.log}>
            <NavLink to="/login" activeClassName={classes.active} exact>
              Login/Signup
            </NavLink>
          </li>
        )}
      </ul>
    );
    return (
      <div>
        {backdrop}
        <div className={sideClass.join(" ")}>{nav2}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Login.TokenId !== null,
    data: state.Login.Cart,
    login: state.Login.loginData,
    error: state.Login.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch(actions.logOut());
    },
    getCartData : () =>{ dispatch(actions.getCart())},
    errorNull: () => dispatch(actions.nullError())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideDrawer));
