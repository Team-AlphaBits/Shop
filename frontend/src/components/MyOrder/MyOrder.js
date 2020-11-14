import React, { Component } from "react";
import classes from "./MyOrder.module.css";

export default class MyOrder extends Component {
  render() {
    let cards = [];
    for (let i = 0; i < 8; i++) {
      cards.push(
        <div className={classes.container}>
          <img
          alt="some"
            src="https://m.media-amazon.com/images/I/714qRVfu2vL._AC_UY327_QL65_.jpg"
            className={classes.img}
          />
          <div className={classes.disc}>
            <a className={classes.name} href="/">
              Samsung Galaxy Tab A7 (10.4 inch, RAM 3 GB, ROM 32 GB,
              Wi-Fi-only), Gold
            </a>
            <p className={classes.price}>₹ 20,999.00</p>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.Maincontainer}>
        <p className={classes.Heading}>Your previous orders are :</p>
        {cards}
      </div>
    );
  }
}
