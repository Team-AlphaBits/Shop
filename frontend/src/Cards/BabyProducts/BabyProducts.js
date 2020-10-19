import React from "react";
import ReactDOM from "react-dom";
import { Card, Button } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import classes from "./BabyProducts.module.css";
import Item from "./Item";
import Penguin from "../../Assets/images/Penguins.jpg";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Clothes() {
  let cards = [];
  for (let i = 0; i < 8; i++) {
    cards.push(
      <Item>
        <img src={Penguin} height="250px" width="100%" />
      </Item>
    );
  }
  return (
    <div>
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints}>{cards}</Carousel>
      </div>
    </div>
  );
}

export default Clothes;
