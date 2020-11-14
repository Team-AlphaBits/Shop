import React from "react";
// import { Card, Button } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import { connect } from "react-redux";
import classes from "./Deal.module.css";
//import Item from "./Item";
// import Penguin from "../../Assets/images/Penguins.jpg";
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCol,
// } from "mdbreact";

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
      <div className={classes.manualcard}>
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/81n8WL9e4xL._SL1500_.jpg"
          alt="pic"
          className={classes.modify}
        />
        <strike className={classes.price}>₹19,990.00</strike>
        <p className={classes.price2}>
          ₹16,990.00<b className={classes.disc}> (15% off)</b>
        </p>

        <button className={classes.btn}>ADD TO CART</button>
      </div>
    );
  }
  return (
    <div className={classes.maincontainer}>
      <div className={classes.container}>
        <h1 className={classes.title}>Exclusive offers on Smartphones :</h1>
        <hr className={classes.line} />
        <div className={classes.App}>
          <Carousel breakPoints={breakPoints}>{cards}</Carousel>
        </div>
        <p className={classes.offer}>
          <a href="/ProductList/Mobiles/true">See All Offers ...</a>
        </p>
      </div>
      <div className={classes.container}>
        <h1 className={classes.title2}>
          Blockbuster Deals on Electronic Products :
        </h1>
        <hr className={classes.line} />
        <div className={classes.App}>
          <Carousel breakPoints={breakPoints}>{cards}</Carousel>
        </div>
        <p className={classes.offer}>
          <a href="/ProductList/Electronics/true">See All Offers ...</a>
        </p>
      </div>
      <div className={classes.container}>
        <h1 className={classes.title2}>Best Deals ever on Home Decors :</h1>
        <hr className={classes.line} />

        <div className={classes.App}>
          <Carousel breakPoints={breakPoints}>{cards}</Carousel>
        </div>
        <p className={classes.offer}>
          <a href="/ProductList/Decoration/true">See All Offers ...</a>
        </p>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    signedUp: state.Login.signuped,
    Data: state.Login.Data,
    success: state.Login.FetchSuccess,
  };
};
export default connect(mapStateToProps)(Deals);
