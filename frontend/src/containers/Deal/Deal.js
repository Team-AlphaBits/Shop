import React from "react";
import ReactDOM from "react-dom";
import { Card, Button } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import classes from "./Deal.module.css";
//import Item from "./Item";
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

function Deals() {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1100, itemsToShow: 4 },
  ];

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
            <p className={classes.price}>₹19,990.00</p>
            <p>
              <strike>₹27,990</strike> (29% off)
            </p>
            <MDBBtn href="/Cart">ADD TO CART</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.title}>Deals on Sports Kits</h1>
        <div className={classes.App}>
          <Carousel breakPoints={breakPoints}>{cards}</Carousel>
        </div>
      </div>
      <div className={classes.container}>
        <h1 className={classes.title2}>Groceries</h1>
        <div className={classes.App}>
          <Carousel breakPoints={breakPoints}>{cards}</Carousel>
        </div>
      </div>
      <div className={classes.container}>
        <h1 className={classes.title2}>Smartphones</h1>
        <div className={classes.App}>
          <Carousel breakPoints={breakPoints}>{cards}</Carousel>
        </div>
      </div>
      <div className={classes.container}>
        <h1 className={classes.title2}>Furnitures</h1>
        <div className={classes.App}>
          <Carousel breakPoints={breakPoints}>{cards}</Carousel>
        </div>
      </div>
    </>
  );
}

export default Deals;
