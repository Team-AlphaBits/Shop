import React, { Component } from "react";
// import Carousel from "../../components/carousel/carousel";
import classes from "./ProductList.module.css";
class ProductList extends Component {
  render() {
    // let cls = ["z-depth-1", classes.car];
    // let img = ["d-block w-100", classes.car];
    let cards = [];
    for (let i = 0; i < 8; i++) {
      cards.push(
        <div>
          <div className={classes.container}>
            <div className={classes.carousel_ctrl}>
              <img
                src="https://m.media-amazon.com/images/I/714qRVfu2vL._AC_UY327_QL65_.jpg"
                className={classes.img}
                alt="some"
              />
            </div>
            <div className={classes.disc}>
              <p className={classes.heading}>
                Redmi Note 9 (Pebble Grey, 6GB RAM 1284GB Storage) - 48MP Quad
                Camera & Full HD+ Display
              </p>
              <div className={classes.pricing}>
                {" "}
                <p className={classes.oldprc}>₹ 14,999.00</p>
                <strike className={classes.prc}>₹ 18,999.00</strike>
                <p className={classes.price}>Save: 4,000.00 (26%)</p>
              </div>
              <p className={classes.amount}>
                Get it by <b>Sunday, October 25 </b>
              </p>
              <p className={classes.amount}>
                FREE Delivery by <b>SHOP</b>{" "}
              </p>
            </div>
          </div>
          <hr className={classes.line} />
        </div>
      );
    }
    return <div className={classes.maincontainer}>{cards}</div>;
  }
}
export default ProductList;
