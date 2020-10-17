import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";
import classes from "./StaticCards.module.css";
import HorizontalScroll from "react-scroll-horizontal";
class StaticCards extends Component {
  render() {
    let cards = [];
    for (let i = 0; i < 8; i++) {
      cards.push(
        <MDBCol>
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardImage
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
              waves
            />
            <MDBCardBody>
              <p className={classes.disc}>Up to 40% off</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      );
    }
    return (
      <div>
        <div className={classes.flexbox}>{cards}</div>
      </div>
    );
  }
}
export default StaticCards;
