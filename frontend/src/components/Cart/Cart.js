import React, { Component } from "react";
// import Carousel from "../../components/carousel/carousel";
import classes from "./Cart.module.css";
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../../Store/Action/index'
import {withCookies} from 'react-cookie';

class Details extends Component {
  check = () => {
    return <Redirect to="/Checkout" />;
  };
  componentDidMount(){
    this.props.authCheckout();
    this.props.getCartData();
  }
  state = {
    prodValue: 1
  }
  quantChange = (id,event) =>{
    this.setState({prodValue: event.target.value})
    this.props.changeQuantity(id,event.target.value)
  }
  render() {
    // let cls = ["z-depth-1", classes.car];
    // let img = ["d-block w-100", classes.car];
    let options=[];
    for(let i = 1; i<11; i++){
      options.push(<option value={i}>{i}</option>)
    }
    console.log(this.props.data)
    let cards = [];
    let subTotal = null;
    if(this.props.data){
      let prods = this.props.data.cartData.cart.cartlist;
      if(prods.length){
        subTotal = <>
        <hr className={classes.hr} />
        <p className={classes.totalprice}>Subtotal : ₹ {this.props.data.cartData.cart.total_price}</p>
        <button className={classes.totalbtn}> Checkout all Product</button>
        </>
        for (let i = 0; i < prods.length; i++) {
          cards.push(
            <div>
              <div className={classes.container}>
                <div className={classes.carousel_ctrl}>
                  <img
                    alt="img"
                    src={prods[i].image}
                    className={classes.img}
                  />
                </div>
                <div className={classes.disc}>
                  <p className={classes.heading}>
                    {prods[i].short_desc}
                  </p>
          <p className={classes.oldprc}>₹ {prods[i].price}</p>
                  <p className={classes.price}>
                    You Save: <b className={classes.color}> ₹ 4,000.00 (19%) </b>
                  </p>
                  <p className={classes.avl}>In stock.</p>
                  <p className={classes.amount}>Eligible for FREE Shipping </p>
                  <div className={classes.quantity}>
                    {/* <button className={classes.addBtn}>Qty:{prods[i].quantity}</button> */}
                    <select 
                    className={classes.addBtn} 
                    onChange={(event) => this.quantChange(prods[i].product_id,event)} 
                    value= {prods[i].quantity}>
                      {options}
                    </select>
                    <div className={classes.btns}>
                      <button className={classes.quaBtn} onClick={() => this.props.removeProd(prods[i].product_id)}>Delete</button>
                    </div>
                  </div>
                  <p className={classes.free}>
                    ✔ Your order is eligible for FREE Delivery.{" "}
                  </p>
                  <p className={classes.total}>
                    Subtotal ({prods[i].quantity} item): <b>₹ 15,999.00</b>
                  </p>
                </div>
              </div>
            </div>
          );
        }
      }
      else{
        cards.push(<h1>No Products....!</h1>)
      }
    }
    return (
      <div className={classes.maincontainer}>
        {cards}
        {subTotal}
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
  return{
    data: state.Login.Cart
  }
}
const mapDispatchToProps=(dispatch) =>{
  return{
   getCartData : () =>{ dispatch(actions.getCart())},
   authCheckout: () => dispatch(actions.authCheckState()),
   changeQuantity: (id,val) => dispatch(actions.changeValue(id,val)),
   removeProd: (id) => dispatch(actions.deleteProd(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withCookies(Details));
