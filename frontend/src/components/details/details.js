import React, { Component } from "react";
import classes from "./details.module.css";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/index";
import Carousel from "react-elastic-carousel";

class Details extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.location.search.split("?")[1]);
  }
  render() {
    if (this.props.DetailData) {
      console.log(this.props.DetailData.productData);
    }
    let img = ["d-block w-100", classes.carimg];
    let show = null;
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
              M.R.P.: <strike>₹ 20,999.00</strike>
            </p>
            <p className={classes.amount}>
              Deal of the Day:{" "}
              <b className={classes.price}>
                ₹ {this.props.DetailData.productData.price}.00
              </b>
            </p>
            <p className={classes.price2}>
              You Save: <b className={classes.price}> ₹ 4,000.00 (19%) </b>
            </p>
            <b>Inclusive of all taxes</b>
            <p>
              Delivery by: <b>Monday, Oct 26</b> Details
            </p>
            <p className={classes.avl}>In stock.</p>
            <button className={classes.cartBtn}>Add to Cart</button>
            <button className={classes.buyBtn}>Buy Now</button>
            <p>
              Sold by{" "}
              <b className={classes.sold}>
                {this.props.DetailData.productData.seller_name}
              </b>{" "}
              and Fulfilled by <b className={classes.sold}>Shop</b>.{" "}
            </p>

            <ul className={classes.discription}>{details}</ul>
          </div>
        </div>
      );
    }
    return <>{show}</>;
  }
}
const mapStatetoProps = (state) => {
  return {
    DetailData: state.Login.detail,
  };
};
const mapDispatchToprops = (dispatch) => {
  return {
    getProduct: (id) => {
      dispatch(actions.getById(id));
    },
  };
};
export default connect(mapStatetoProps, mapDispatchToprops)(Details);
