import React, { Component } from "react";
import { Button } from "react-bootstrap";
// import Carousel from "../../components/carousel/carousel";
import classes from "./Cart.module.css";
import { Redirect } from "react-router-dom";
class Details extends Component {
  check = () => {
    return <Redirect to="/Checkout" />;
  };
  render() {
    let cls = ["z-depth-1", classes.car];
    let img = ["d-block w-100", classes.car];
    let cards = [];
    for (let i = 0; i < 2; i++) {
      cards.push(
        <div>
          <div className={classes.container}>
            <div className={classes.carousel_ctrl}>
              <img
                src="https://m.media-amazon.com/images/I/714qRVfu2vL._AC_UY327_QL65_.jpg"
                className={classes.img}
              />
            </div>
            <div className={classes.disc}>
              <p className={classes.heading}>
                Samsung Galaxy Tab A7 (10.4 inch, RAM 3 GB, ROM 32 GB,
                Wi-Fi-only), Gold{" "}
              </p>
              <p className={classes.oldprc}>₹ 20,999.00</p>
              <p className={classes.price}>
                You Save: <b className={classes.color}> ₹ 4,000.00 (19%) </b>
              </p>
              <p className={classes.avl}>In stock.</p>
              <p className={classes.amount}>Eligible for FREE Shipping </p>
              <div className={classes.quantity}>
                <button className={classes.addBtn}>Qty:1</button>
                <div className={classes.btns}>
                  <button className={classes.quaBtn}>Delete</button>
                  <button className={classes.quaBtn}>Save for later</button>
                  <button className={classes.quaBtn}>See more like this</button>
                </div>
              </div>
              <p className={classes.free}>
                ✔ Your order is eligible for FREE Delivery.{" "}
              </p>
              <p className={classes.total}>
                Subtotal (1 item): <b>15,999.00</b>
              </p>
              <button className={classes.proceed} onClick={this.check}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      );
    }
    return <div className={classes.maincontainer}>{cards}</div>;
  }
}
export default Details;
