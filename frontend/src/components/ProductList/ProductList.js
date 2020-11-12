import React, { Component } from "react";
// import Carousel from "../../components/carousel/carousel";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/index";
import classes from "./ProductList.module.css";
class ProductList extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.history.location.pathname.split("/")[2]);
  }
  changeUrl = (id) => {
    this.props.history.push({
      pathname: "/details",
      hash: "#items",
      search: "?" + id,
    });
  };
  state = {
    particular: false,
  };

  render() {
    console.log(this.props.Data);
    let cards = [];
    if (this.props.Data) {
      for (let i = 0; i < this.props.Data.productData.length; i++) {
        cards.push(
          <div>
            <div className={classes.container}>
              <div className={classes.carousel_ctrl}>
                <img
                  src={this.props.Data.productData[i].home_image}
                  className={classes.img}
                  alt="some"
                  onClick={() =>
                    this.changeUrl(this.props.Data.productData[i]._id)
                  }
                />
              </div>
              <div className={classes.disc}>
                <p
                  className={classes.heading}
                  onClick={() =>
                    this.changeUrl(this.props.Data.productData[i]._id)
                  }
                >
                  {this.props.Data.productData[i].short_desc}
                </p>
                <div className={classes.pricing}>
                  {" "}
                  <p className={classes.oldprc}>₹ 14,999.00</p>
                  <strike className={classes.prc}>₹ 18,999.00</strike>
                  <p className={classes.price}>Save: 4,000.00 (26%)</p>
                </div>
                <p className={classes.amount}>
                  Get it by <b>Sunday, October 25 </b>
                </p>
                <p className={classes.amount}>
                  FREE Delivery by <b>SHOP</b>{" "}
                </p>
              </div>
            </div>
            <hr className={classes.line} />
          </div>
        );
      }
    }
    return <div className={classes.maincontainer}>{cards}</div>;
  }
}
const mapStatetoProps = (state) => {
  return {
    Data: state.Login.catData,
  };
};
const mapDispatchToprops = (dispatch) => {
  return {
    getProduct: (id) => {
      dispatch(actions.getBycatId(id));
    },
  };
};
export default connect(mapStatetoProps, mapDispatchToprops)(ProductList);
