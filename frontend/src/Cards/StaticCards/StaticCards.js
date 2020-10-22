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
import Carousel from "react-elastic-carousel";
import HorizontalScroll from "react-scroll-horizontal";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
class StaticCards extends Component {
  render() {
    let cards = [];
    for (let i = 0; i < 8; i++) {
      cards.push(
        <MDBCol>
          <MDBCard className={classes.card}>
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
      <div className={classes.flexbox}>
        <Carousel breakPoints={breakPoints}>{cards}</Carousel>
      </div>
    );
  }
}
export default StaticCards;
