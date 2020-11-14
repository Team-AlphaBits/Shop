import React from "react";
import Carousel from "react-elastic-carousel";
import classes from "./Clothes.module.css";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
const discount= (price,arg,dis) =>{
  let modifiedPrice = parseFloat(price.replace( /[^\d.]*/g,''));
if(arg === "newprice"){
  return Math.floor(modifiedPrice - (dis * modifiedPrice)/100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
else if(arg === "oldprice"){
  let newprice = modifiedPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  return newprice
}
}
function Clothes(props) {
  let cards = [];
  let cnt = 0;
  if (props.data != null) {
    for (let i = 0; i < 175 && cards.length < 8; i++) {
      let des = Math.floor(Math.random() * (50)) + 1;
      if (props.data.productData[i].cat_id === "Clothings") {
        cnt++;
        if (cnt < 8) {
          cards.push(
            <div
              className={classes.manualcard}>
              <img
                src={props.data.productData[i].home_image}
                alt="pic"
                className={classes.modify}
                onClick={() => props.change(props.data.productData[i]._id)}
              />
              <p className={classes.h4} 
              onClick={() => props.change(props.data.productData[i]._id)}>
                {props.data.productData[i].title}
                </p>
              <p className={classes.price} style={{ marginTop: "-15px" }}>
                ₹{discount(props.data.productData[i].price,"newprice",des)}
              </p>
              <p style={{ marginTop: "-15px" }}>
          <strike>₹{discount(props.data.productData[i].price,"oldprice",des)}</strike> ({des}% off)
              </p>
              <button className={classes.btn} onClick={() => props.cartAdd(props.data.productData[i]._id)}>ADD TO CART</button>
            </div>
          );
        }
      }
    }
  }

  return (
    <div className={classes.maincontainer}>
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints}>{cards}</Carousel>
      </div>
      <p className={classes.offer}>
        <a href="/ProductList/Clothings/true">See All Offers ...</a>
      </p>
    </div>
  );
}

export default Clothes;
