import React, { Component } from "react";
import classes from "./StaticCards.module.css";
import Carousel from "react-elastic-carousel";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
class StaticCards extends Component {
  render() {
    let cards = [];
    let cnt = 0;
    if (this.props.data) {
      for (let i = 0; i < 175 && cards.length < 8; i++) {
      let des = Math.floor(Math.random() * (50)) + 1;
        if (this.props.data.productData[i].cat_id === "Books") {
          cnt++;
          if (cnt > 8) {
            cards.push(
              <div
                className={classes.manualcard}
                onClick={() =>
                  this.props.change(this.props.data.productData[i]._id)
                }
              >
                <img
                  src={this.props.data.productData[i].home_image}
                  alt="pic"
                  className={classes.modify}
                />
                <p className={classes.disc}>Up to {des}% off</p>
              </div>
            );
          }
        }
      }
    }
    return (
      <div className={classes.maincontainer}>
        <div className={classes.flexbox}>
          <Carousel breakPoints={breakPoints}>{cards}</Carousel>
        </div>
        <p className={classes.offer}>
          <a href="/ProductList/Books/true">See All Offers ...</a>
        </p>
      </div>
    );
  }
}
export default StaticCards;
