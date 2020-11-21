import React, { Component } from "react";
import classes from "./details.module.css";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/index";
import Carousel from "react-elastic-carousel";
import Spinner from '../spinner/spinner'
import Modal from '../Modal/Modal'

class Details extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.location.search.split("?")[1]);
  }
  discount= (price,arg,dis) =>{
    let modifiedPrice = parseFloat(price.replace( /[^\d.]*/g,''));
  if(arg === "newprice"){
    return Math.floor(modifiedPrice - (dis * modifiedPrice)/100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }
  else if(arg === "oldprice"){
    let newprice = modifiedPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    return newprice
  }
    else if(arg === "diff"){
        return (modifiedPrice - Math.floor(modifiedPrice - (dis * modifiedPrice)/100)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
}
AddedtoCart = (id,stat) =>{
  if(this.props.isAuthenticated && stat === "Add"){
    this.props.addTocart(id)
   }
   else if(this.props.isAuthenticated && stat === "Buy"){
    this.props.addTocart(id)
    this.props.history.push({
      pathname: "/cart"
    });
   }
   else{
    this.props.history.push({
      pathname: "/login"
    });
  }
  }
  render() {
    let img = ["d-block w-100", classes.carimg];
    let dis = Math.floor(Math.random() * (50)) + 1;
    let show = <Spinner />;
    if (this.props.DetailData) {
      let des = this.props.DetailData.productData.description.split(".");
      let details = [];
      let Yes = false;
      for (let i = 0; i < des.length - 1; i++) {
        details.push(<li>{des[i]}.</li>);
        Yes = true;
      }
      if (!Yes) {
        details.push(<li>{this.props.DetailData.productData.description}.</li>);
      }
      show = (
        <div className={classes.container}>
          <div className={classes.carousel_ctrl}>
            <Carousel showArrows={false}>
              <img
                className={classes.carimg}
                src={this.props.DetailData.productData.images[0]}
                alt="Second slide"
              />
              <img
                className={classes.carimg}
                src={this.props.DetailData.productData.images[1]}
                alt="Second slide"
              />
              <img
                className={classes.carimg}
                src={this.props.DetailData.productData.images[2]}
                alt="Second slide"
              />
              <img
                className={classes.carimg}
                src={this.props.DetailData.productData.images[3]}
                alt="Second slide"
              />
            </Carousel>
          </div>
          <div className={classes.disc}>
            <p className={classes.heading}>
              {this.props.DetailData.productData.short_desc}
            </p>
            <p className={classes.oldprc}>
              M.R.P.: <strike>₹ {this.discount(this.props.DetailData.productData.price,"oldprice",dis)}</strike>
            </p>  
            <p className={classes.amount}>
              Deal of the Day:{" "}
              <b className={classes.price}>
                ₹ {this.discount(this.props.DetailData.productData.price,"newprice",dis)}.00
              </b>
            </p>
            <p className={classes.price2}>
              You Save: <b className={classes.price}> ₹ {this.discount(this.props.DetailData.productData.price,"diff",dis)} (19%) </b>
            </p>
            <b>Inclusive of all taxes</b>
            <p className={classes.avl}>In stock.</p>
            <button className={classes.cartBtn} onClick={() => this.AddedtoCart(this.props.DetailData.productData._id,"Add")}>Add to Cart</button>
            <button className={classes.buyBtn} onClick={() => this.AddedtoCart(this.props.DetailData.productData._id,"Buy")}>Buy Now</button>
            <p>
              Sold by{" "}
              <b className={classes.sold}>
                {this.props.DetailData.productData.seller_name}
              </b>{" "}
              and Fulfilled by <b className={classes.sold}>Shop</b>.{" "}
            </p>

            <div className={classes.discborder}>
              <ul className={classes.discription}>{details}</ul>
            </div>
          </div>
        </div>
      );
    }
    if(this.props.error){
      show= <Modal modalclosed={() => this.props.errorNull()}>Some Error Occured...!</Modal>
    }
    return <>{show}</>;
  }
}
const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.Login.TokenId !== null,
    DetailData: state.Login.detail,
    error: state.Login.error,
  };
};
const mapDispatchToprops = (dispatch) => {
  return {
    getProduct: (id) => {
      dispatch(actions.getById(id));
    },
    addTocart: (id) => dispatch(actions.addToCart(id)),
    authCheckout: () => dispatch(actions.authCheckState()),
    errorNull: () => dispatch(actions.nullError())
  };
};
export default connect(mapStatetoProps, mapDispatchToprops)(Details);
