import React,{Component} from "react";
// import { Card, Button } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import { connect } from "react-redux";
import classes from "./Deal.module.css";
import * as actions from "../../Store/Action/index";
import Spinner from '../../components/spinner/spinner'
import Modal from '../../components/Modal/Modal'

class Deals extends Component{
  componentDidMount(){
    this.props.onFetchData();
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
}
changeUrl = (id) =>{
  this.props.history.push({
    pathname: "/details",
    hash: "#items",
    search: "?" + id,
  });
};
AddedtoCart = (id) =>{
  if(this.props.isAuthenticated){
    this.props.addTocart(id)
   }
   else{
    this.props.history.push({
      pathname: "/login"
    });
  }
}
  render() {
    let page = <Spinner />
    let smartPhone = [],ph=0;
    let Electronic = [],el=0;
    let Decor = [],de=0;
    const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 1100, itemsToShow: 4 },
    ];
  if(this.props.Data){
    let some = this.props.Data.productData;
    for(let i=0; i<some.length; i++){
        
      if(some[i].cat_id === "Electronics" && el<8){
          el++;
          let des = Math.floor(Math.random() * (50)) + 1;
          Electronic.push(
            <div className={classes.manualcard}>
              <img
                src={some[i].home_image}
                alt="pic"
                className={classes.modify}
                onClick={() => this.changeUrl(some[i]._id)}
              />
              <strike className={classes.price}>₹{this.discount(some[i].price,"oldprice",des)}</strike>
              <p className={classes.price2}>
              ₹{this.discount(some[i].price,"newprice",des)}<b className={classes.disc}> ({des}% off)</b>
              </p>
      
              <button className={classes.btn} onClick={() => this.AddedtoCart(some[i]._id)}>ADD TO CART</button>
            </div>
          );
      }
      if(some[i].cat_id === "Mobiles" && ph<8){
        let des = Math.floor(Math.random() * (50)) + 1;
        ph++;
        smartPhone.push(
          <div className={classes.manualcard}>
            <img
              src={some[i].home_image}
              alt="pic"
              className={classes.modify}
              onClick={() => this.changeUrl(some[i]._id)}
            />
            <strike className={classes.price}>₹{this.discount(some[i].price,"oldprice",des)}</strike>
            <p className={classes.price2}>
            ₹{this.discount(some[i].price,"newprice",des)}<b className={classes.disc}> ({des}% off)</b>
            </p>
    
            <button className={classes.btn} onClick={() => this.AddedtoCart(some[i]._id)}>ADD TO CART</button>
          </div>
        );
    }
    if(some[i].cat_id === "Decoration" && de<8){
        let des = Math.floor(Math.random() * (50)) + 1;
        de++;
      Decor.push(
        <div className={classes.manualcard}>
          <img
            src={some[i].home_image}
            alt="pic"
            className={classes.modify}
            onClick={() => this.changeUrl(some[i]._id)}
          />
          <strike className={classes.price}>₹{this.discount(some[i].price,"oldprice",des)}</strike>
          <p className={classes.price2}>
      ₹{this.discount(some[i].price,"newprice",des)}<b className={classes.disc}> ({des}% off)</b>
          </p>
  
          <button className={classes.btn} onClick={() => this.AddedtoCart(some[i]._id)}>ADD TO CART</button>
        </div>
      );
  }
    }
    page = <div className={classes.maincontainer}>
    <div className={classes.container}>
      <h1 className={classes.title}>Exclusive offers on Smartphones :</h1>
      <hr className={classes.line} />
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints}>{smartPhone}</Carousel>
      </div>
      <p className={classes.offer}>
        <a href="/ProductList/Mobiles/true">See All Offers ...</a>
      </p>
    </div>
    <div className={classes.container}>
      <h1 className={classes.title2}>
        Blockbuster Deals on Electronic Products :
      </h1>
      <hr className={classes.line} />
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints}>{Electronic}</Carousel>
      </div>
      <p className={classes.offer}>
        <a href="/ProductList/Electronics/true">See All Offers ...</a>
      </p>
    </div>
    <div className={classes.container}>
      <h1 className={classes.title2}>Best Deals ever on Home Decors :</h1>
      <hr className={classes.line} />

      <div className={classes.App}>
        <Carousel breakPoints={breakPoints}>{Decor}</Carousel>
      </div>
      <p className={classes.offer}>
        <a href="/ProductList/Decoration/true">See All Offers ...</a>
      </p>
    </div>
  </div>
  }
  if(this.props.error){
    page = <Modal modalclosed={() => this.props.errorNull()}>Some Error Occured...!</Modal>
  }
    return (
      <>{page}</>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    signedUp: state.Login.signuped,
    Data: state.Login.Data,
    isAuthenticated: state.Login.TokenId !== null,
    success: state.Login.FetchSuccess,
    error: state.Login.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchData: () => dispatch(actions.getData()),
    authCheckout: () => dispatch(actions.authCheckState()),
    addTocart: (id) => dispatch(actions.addToCart(id)),
    errorNull: () => dispatch(actions.nullError())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Deals);