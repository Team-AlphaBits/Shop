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
  if(props.data){
    for (let i = 0; i < 8; i++) {
      cards.push(
         <div className={classes.manualcard}>
         <img src={props.data.productData[i].home_image} alt="pic" className={classes.modify}/>
       </div>
      );
    }
  }
  return (
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints}>{cards}</Carousel>
      </div>
  );
}

export default Clothes;
