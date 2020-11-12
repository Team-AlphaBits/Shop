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
<<<<<<< HEAD
      for (let i = 0; i < 175; i++) {
        if (this.props.data.productData[i].cat_id === "Books") {
          cards.push(
            <div className={classes.manualcard}>
              <img
                src={this.props.data.productData[i].home_image}
                alt="pic"
                className={classes.modify}
              />
              <p className={classes.disc}>Up to 40% off</p>
            </div>
          );
=======
      for (let i = 0; i < 175 && cards.length < 8; i++) {
        if (this.props.data.productData[i].cat_id === "Books") {
          cnt++;
          if(cnt>8){
            cards.push(
              <div className={classes.manualcard} onClick={() => this.props.change(this.props.data.productData[i]._id)}>
                <img
                  src={this.props.data.productData[i].home_image}
                  alt="pic"
                  className={classes.modify}
                />
                <p className={classes.disc}>Up to 40% off</p>
              </div>
            );
          }
>>>>>>> 5369f3bd1e1d312742c1cc26fde7a38d0609d09f
        }
      }
    }
    return (
      <div>
        <div className={classes.flexbox}>
          <Carousel breakPoints={breakPoints}>{cards}</Carousel>
        </div>
        <p className={classes.offer}>
          <a href="/ProductList">See All Offers ...</a>
        </p>
      </div>
    );
  }
}
export default StaticCards;
