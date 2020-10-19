import React from "react";
import ReactDOM from "react-dom";
import { Card, Button } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import classes from "./Clothes.module.css";
import Penguin from "../../Assets/images/Penguins.jpg";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";
import HorizontalScroll from "react-scroll-horizontal";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Clothes() {
  let cards = [];
  for (let i = 0; i < 8; i++) {
    cards.push(
      <MDBCol>
        <MDBCard style={{ width: "22rem" }}>
          <MDBCardImage className="img-fluid" src={Penguin} waves />
          <MDBCardBody>
            <p className={classes.price}>₹19,990.00</p>
            <p>
              <strike>₹27,990</strike> (29% off)
            </p>
            <MDBBtn href="#">ADD TO CART</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }

  return (
    <>
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints}>{cards}</Carousel>
      </div>
    </>
  );
}

export default Clothes;
