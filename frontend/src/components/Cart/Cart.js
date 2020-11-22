import React, { Component } from "react";
// import Carousel from "../../components/carousel/carousel";
import classes from "./Cart.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/index";
import Spinner from '../spinner/spinner'
import Modal from '../Modal/Modal'

class Details extends Component {
  check = () => {
    return <Redirect to="/Checkout" />;
  };
  quantChange = (id,event) =>{
    this.setState({prodValue: event.target.value})
    this.props.changeQuantity(id,event.target.value)
  }
  changeUrl = (id) =>{
    this.props.history.push({
      pathname: "/details",
      hash: "#items",
      search: "?" + id,
    });
  };
  checkOut = () =>{
    this.props.history.push({
      pathname: "/checkout"
    });
  };
  componentDidMount(){
    this.props.getCartData()
  }
  render() {
    // let cls = ["z-depth-1", classes.car];
    // let img = ["d-block w-100", classes.car];
    let options=[];
    for(let i = 1; i<11; i++){
      options.push(<option value={i}>{i}</option>)
    }
    let cards = [];
    let subTotal = <>
    <Spinner />
    </> 
    if(this.props.data){
      let prods = this.props.data.cartData.cart.cartlist;
      if(prods.length){
        subTotal = <>
        <hr className={classes.hr} />
        <p className={classes.totalprice}>Subtotal : ₹ {parseFloat(this.props.data.cartData.cart.total_price.toString().replace( /[^\d.]*/g,'')).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
        <button className={classes.totalbtn} onClick={this.checkOut}> Checkout all Product</button>
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
                    onClick={() => this.changeUrl(prods[i].product_id)}
                  />
                </div>
                <div className={classes.disc}>
                  <p className={classes.heading}  onClick={() => this.changeUrl(prods[i].product_id)}>
                    {prods[i].short_desc}
                  </p>
          <p className={classes.oldprc}>₹ {parseFloat(prods[i].price.replace( /[^\d.]*/g,'')).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
                  <p className={classes.avl}>In stock.</p>
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
          Subtotal ({prods[i].quantity} item): <b>₹ {(parseFloat(prods[i].quantity)*parseFloat(prods[i].price.replace( /[^\d.]*/g,''))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</b>
                  </p>
                </div>
              </div>
            </div>
          );
        }
      }
      else{
        cards.push(<h1>No Products....!</h1>)
        subTotal=null;
      }
    }
    if(this.props.error){
      cards.push(<Modal modalclosed={() => this.props.errorNull()}>Some Error Occured...!</Modal>)
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
    isAuthenticated: state.Login.TokenId !== null,
    data: state.Login.Cart,
    error: state.Login.error,
  }
}
const mapDispatchToProps=(dispatch) =>{
  return{
   getCartData : () =>{ dispatch(actions.getCart())},
   authCheckout: () => dispatch(actions.authCheckState()),
   changeQuantity: (id,val) => dispatch(actions.changeValue(id,val)),
   removeProd: (id) => dispatch(actions.deleteProd(id)),
   errorNull: () => dispatch(actions.nullError())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Details);
