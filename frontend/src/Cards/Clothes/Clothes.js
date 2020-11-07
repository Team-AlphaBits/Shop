import React from "react";
import Carousel from "react-elastic-carousel";
import classes from "./Clothes.module.css";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Clothes(props) {

    let cards = [];
  if(props.data != null){
    for (let i = 0; i < props.data.productData.length; i++) {
      if(props.data.productData[i].cat_id === "Clothings")
      {
        cards.push(
        <div className={classes.manualcard} onClick={() => props.change(props.data.productData[i]._id)}>
      <img 
      src={props.data.productData[i].home_image} 
      alt="pic" 
      className={classes.modify}/>
      <p className={classes.h4}>{props.data.productData[i].title}</p>
      <p className={classes.price} style={{marginTop: "-15px"}}>₹{props.data.productData[i].price}</p>
                 <p style={{marginTop: "-15px"}}>
                   <strike>₹27,990</strike> (29% off)
                 </p>
                 <button>ADD TO CART</button>
        </div>
        );
      }
    }
  }

  return (
    <>
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints}>{cards}</Carousel>
      </div>
    </>
  );
}

export default Clothes;
