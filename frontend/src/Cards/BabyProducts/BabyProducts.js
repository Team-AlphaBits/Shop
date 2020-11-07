import React from "react";
import Carousel from "react-elastic-carousel";
import classes from "./BabyProducts.module.css";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Clothes(props) {
  let cards = [];
  if (props.data) {
    for (let i = 0; i < 8; i++) {
      cards.push(
        <div className={classes.manualcard}>
          <img
            src={props.data.product_data[i].home_image}
            alt="pic"
            className={classes.modify}
          />
          <p className={classes.h4}>{props.data.product_data[i].title}</p>
        </div>
      );
    }
  }
  return (
    <div>
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints}>{cards}</Carousel>
      </div>

      <p className={classes.offer}>
        <a href="/ProductList">See All Offers ...</a>
      </p>
    </div>
  );
}

export default Clothes;
