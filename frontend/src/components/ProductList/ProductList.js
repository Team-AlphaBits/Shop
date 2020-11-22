import React, { Component } from "react";
// import Carousel from "../../components/carousel/carousel";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/index";
import classes from "./ProductList.module.css";
import Spinner from '../spinner/spinner'
import Modal from '../Modal/Modal'
class ProductList extends Component {
  componentDidMount() {
    if(this.props.history.location.pathname.split("/")[3] === "true"){
      this.props.getProduct(this.props.history.location.pathname.split("/")[2]);
    }
  }
  changeUrl = (id) => {
    this.props.history.push({
      pathname: "/details",
      hash: "#items",
      search: "?" + id,
    });
  };
  discount = (price, arg, dis) => {
    let modifiedPrice = parseFloat(price.replace(/[^\d.]*/g, ""));
    if (arg === "newprice") {
      return Math.floor(modifiedPrice - (dis * modifiedPrice) / 100)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else if (arg === "oldprice") {
      let newprice = modifiedPrice
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      return newprice;
    } else if (arg === "diff") {
      return (
        modifiedPrice - Math.floor(modifiedPrice - (dis * modifiedPrice) / 100)
      )
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  };
  render() {
    let cards = [];
    if (this.props.history.location.pathname.split("/")[3] === "true") {
      if (this.props.Data) {
        for (let i = 0; i < this.props.Data.productData.length; i++) {
          let des = Math.floor(Math.random() * 50) + 1;
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
                  <strike className={classes.prc}>
                      ₹{" "}
                      {this.discount(
                        this.props.Data.productData[i].price,
                        "oldprice",
                        des
                      )}
                    </strike>
                  <div className={classes.pricing}>
                    {" "}
                    <p className={classes.oldprc}>
                      ₹{" "}
                      {this.discount(
                        this.props.Data.productData[i].price,
                        "newprice",
                        des
                      )}
                    </p>
                    <p className={classes.price}>
                      Save: ₹
                      {this.discount(
                        this.props.Data.productData[i].price,
                        "diff",
                        des
                      )}{" "}
                      ({des}%)
                    </p>
                  </div>
                  <p className={classes.amount}>
                    FREE Delivery by <b style={{color: "#01ab9d",fontSize: "20px"}}>SHOP</b>{" "}
                  </p>
                </div>
              </div>
              <hr className={classes.line} />
            </div>
          );
        }
      }
    } else {
      if (this.props.search) {
        if(this.props.search.data.result.length === 0){
            cards.push(<h1>No Products Found...!</h1>)
        }
        else{
          for (let i = 0; i < this.props.search.data.result.length; i++) {
            let des = Math.floor(Math.random() * 50) + 1;
            cards.push(
              <div>
                <div className={classes.container}>
                  <div className={classes.carousel_ctrl}>
                    <img
                      src={this.props.search.data.result[i].home_image}
                      className={classes.img}
                      alt="some"
                      onClick={() =>
                        this.changeUrl(this.props.search.data.result[i]._id)
                      }
                    />
                  </div>
                  <div className={classes.disc}>
                    <p
                      className={classes.heading}
                      onClick={() =>
                        this.changeUrl(this.props.search.data.result[i]._id)
                      }
                    >
                      {this.props.search.data.result[i].short_desc}
                    </p>
                    <div className={classes.pricing}>
                      {" "}
                      <p className={classes.oldprc}>
                        ₹{" "}
                        {this.discount(
                          this.props.search.data.result[i].price,
                          "newprice",
                          des
                        )}
                      </p>
                      <strike className={classes.prc}>
                        ₹{" "}
                        {this.discount(
                          this.props.search.data.result[i].price,
                          "oldprice",
                          des
                        )}
                      </strike>
                      <p className={classes.price}>
                        Save: ₹
                        {this.discount(
                          this.props.search.data.result[i].price,
                          "diff",
                          des
                        )}{" "}
                        ({des}%)
                      </p>
                    </div>
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
      }
    }
    if(this.props.error){
      cards.push(<Modal modalclosed={() => this.props.errorNull()}>Some Error Occured...!</Modal>)
    }
    return <div className={classes.maincontainer}>
      {cards.length === 0 ? <Spinner /> : cards}
      </div>;
  }
}
const mapStatetoProps = (state) => {
  return {
    Data: state.Login.catData,
    search: state.Login.resultData,
    error: state.Login.error,
  };
};
const mapDispatchToprops = (dispatch) => {
  return {
    getProduct: (id) => {
      dispatch(actions.getBycatId(id));
    },
    authCheckout: () => dispatch(actions.authCheckState()),
    errorNull: () => dispatch(actions.nullError())
  };
};
export default connect(mapStatetoProps, mapDispatchToprops)(ProductList);
