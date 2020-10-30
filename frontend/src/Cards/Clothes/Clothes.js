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

function Clothes(props) {
  let cards = [];
  let cls = ["img-fluid", classes.img];
  if (props.data) {
    for (let i = 0; i < 8; i++) {
      cards.push(
        <MDBCol>
          <MDBCard className={classes.card}>
            <MDBCardImage
              className={cls.join(" ")}
              src={props.data[i].image}
              waves
            />
            <MDBCardBody className={classes.cardbody}>
              <p className={classes.price}>${props.data[i].price}</p>
              <p>
                <strike>₹27,990</strike> (29% off)
              </p>
              <button className={classes.btn}>ADD TO CART</button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      );
    }
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
