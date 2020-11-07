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
    if(this.props.data){
      for (let i = 0; i < 175; i++) {
        if(this.props.data.productData[i].cat_id === "Books"){
          cards.push(
            <div className={classes.manualcard}>
            <img src={this.props.data.productData[i].home_image} alt="pic" className={classes.modify}/>
            <p className={classes.disc}>Up to 40% off</p>
          </div>
          );
        }
      }
    }
    return (
      <div className={classes.flexbox}>
        <Carousel breakPoints={breakPoints}>{cards}</Carousel>
      </div>
    );
  }
}
export default StaticCards;
