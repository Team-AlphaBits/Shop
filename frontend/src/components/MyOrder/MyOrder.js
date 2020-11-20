import React, { Component } from "react";
import classes from "./MyOrder.module.css";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/index";
import {withRouter} from 'react-router-dom'
import Spinner from '../spinner/spinner'
import Modal from '../Modal/Modal'

class MyOrder extends Component {
  componentDidMount(){
    this.props.getOrder()
  }
  changeUrl = (id) =>{
    this.props.history.push({
      pathname: "/details",
      hash: "#items",
      search: "?" + id,
    });
  };
  render() { 
    let cards = [];
    if(this.props.myOrders){
      let items = this.props.myOrders;
      if(items.length === 0){
        cards.push(<h1>No Previous Orders...!</h1>)
      }
      else{
        for(let j=0; j<items.length; j++){
          cards.push(<p className={classes.Heading}>Order #{j+1} :</p>)
          for (let i = 0; i < items[j].productDetails.length; i++) {
            let item = items[j].productDetails[i];
            cards.push(
              <div>
                <div className={classes.container}>
                <img
                alt="some"
                  src={item.image}
                  className={classes.img}
                />
                <div className={classes.disc}>
                  <p className={classes.name} onClick={() => this.changeUrl(item.product_id)}>
                    {item.short_desc}
                  </p>
                    <p className={classes.price}>₹ {parseFloat(item.price.replace( /[^\d.]*/g,'')).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
                </div>
              </div>
              </div>
            );
          }
          }
      }
    }
    if(this.props.error){
      cards.push(<Modal modalclosed={() => this.props.errorNull()}>Order is not Placed...!</Modal>)
    }
    return (
      <div className={classes.Maincontainer}>
        {cards.length === 0 ? <Spinner /> : cards}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    getOrder : () => dispatch(actions.prevOrders()),
    errorNull: () => dispatch(actions.nullError())
  }
}
const mapStateToProps = (state) =>{
  return{
    myOrders: state.Login.Orders,
    error: state.Login.error,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MyOrder))
