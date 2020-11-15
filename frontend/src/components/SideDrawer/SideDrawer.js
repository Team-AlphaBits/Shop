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
          <Badges
            cart={
              this.props.data ? this.props.data.cartData.cart.cartlist : null
            }
            cartLogin={this.props.login}
          />
        </li>
        <li className={classes.sidelink}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className={classes.sidelink}>
          <NavLink to="/deal">Today's Deals</NavLink>
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
            <NavLink to="/cart">Cart</NavLink>
          </li>
        ) : null}
        <li className={classes.sidelink}>
          <NavLink to="/about">About</NavLink>
        </li>
        {this.props.isAuthenticated ? (
          <li className={classes.sidelink}>
            <NavLink onClick={() => this.props.Logout()} to="/">
              Logout
            </NavLink>
          </li>
        ) : (
          <li className={classes.log}>
            <NavLink to="/login">Login/Signup</NavLink>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch(actions.logOut());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideDrawer));
