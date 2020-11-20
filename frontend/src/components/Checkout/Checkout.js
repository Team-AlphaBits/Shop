import React, { Component } from "react";
import classes from "./Checkout.module.css";
// import { MDBContainer, MDBModal, MDBModalBody } from "mdbreact";
import { Button, Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/index";
import {Redirect} from 'react-router-dom';
import Modal from '../Modal/Modal'
import Spinner from '../spinner/spinner'

class Checkout extends Component {

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  state={
    name: '',
    mobileNo: '',
    addressLine1: '',
    addressLine2: '',
    landmark: 'Alpha-Bits',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: '',
    showPay: false,
    showSpinner: false
  }
  inputChangeHandler = (event,arg) =>{
   if(arg === "name"){
     this.setState({name: event.target.value})
   }
   else if(arg === "mob"){
     this.setState({mobileNo: event.target.value})
   }
   else if(arg === "add1"){
     this.setState({addressLine1: event.target.value})
   }
   else if(arg === "add2"){
    this.setState({addressLine2: event.target.value})
   }
   else if(arg === "city"){
     this.setState({city: event.target.value})
   }
   else if(arg === "state"){
     this.setState({state: event.target.value})
   }
   else if(arg === "pin"){

    this.setState({pincode: event.target.value})
   }
   else if(arg === "pay"){
   this.setState({paymentMethod: event.target.value})
   }
  }
  showToggle = () =>{
    this.setState({
      showPay: true
    })
    setTimeout(() =>{
      window.scrollBy(0,320)
      },1)
  }
  orderNow = () =>{
    this.props.placeOrder(
    this.state.name,
    this.state.mobileNo,
    this.state.addressLine1,
    this.state.addressLine2,
    this.state.landmark,
    this.state.city,
    this.state.state,
    this.state.pincode,
    this.state.paymentMethod
    )
    this.setState({showSpinner: true})
  }
  errorHandler = () =>{
    this.setState({showSpinner: false})
    this.props.errorNull();
    this.props.history.push({
      pathname: "/cart"
    });
  }
  render() {
    let cls = ["form-check form-check-inline", classes.radio];
    let size = ["form-check-input", classes.btn];
    let text = ["form-check-input", classes.text];
    let marg = [classes.maincontainer]
    if(this.state.showPay){
      marg.push(classes.modi)
    }
    let paym = <div className={classes.rdBtn}>
            <p className={classes.payment}>Select your Payment option</p>
            <div className={cls.join(" ")}>
              <input
                className={size.join(" ")}
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="COD"
                onChange={(event) => this.inputChangeHandler(event,"pay")}
              />
              <label className={text.join(" ")} for="inlineRadio1">
                COD (Cash on delivery)
              </label>
            </div>
            <div className={cls.join(" ")}>
              <input
                className={size.join(" ")}
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="Internet banking"
                onChange={(event) => this.inputChangeHandler(event,"pay")}
              />
              <label className={text.join(" ")} for="inlineRadio2">
                Internet banking
              </label>
            </div>
            <div className={cls.join(" ")}>
              <input
                className={size.join(" ")}
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="UPI"
                onChange={(event) => this.inputChangeHandler(event,"pay")}
              />
              <label className={text.join(" ")} for="inlineRadio2">
                UPI Payments
              </label>
            </div>
            <button className={classes.order} onClick={this.orderNow}>
              Place Order
            </button>
          </div>
          let ele =  <div className={marg.join(' ')}>
          <div className={classes.container}>
            <p className={classes.heading}>FILL YOUR ADDRESS</p>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Full name</Form.Label>
                  <Form.Control type="email" placeholder="Enter your Name" onChange={(event) => this.inputChangeHandler(event,"name")}/>
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="password" placeholder="Enter number" onChange={(event) => this.inputChangeHandler(event,"mob")}/>
                </Form.Group>
              </Form.Row>
  
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" onChange={(event) => this.inputChangeHandler(event,"add1")}/>
              </Form.Group>
  
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" onChange={(event) => this.inputChangeHandler(event,"add2")}/>
              </Form.Group>
  
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control onChange={(event) => this.inputChangeHandler(event,"city")}/>
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control onChange={(event) => this.inputChangeHandler(event,"state")}/>
                </Form.Group>
  
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control onChange={(event) => this.inputChangeHandler(event,"pin")}/>
                </Form.Group>
              </Form.Row>
  
              <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
  
              <Button variant="primary"  onClick={this.showToggle}>
                Save Address
              </Button>
            </Form>
            {this.state.showPay ? paym : null}
          </div>
        </div>
        if(this.state.showSpinner){
          ele = <Spinner />
        }
          if(this.props.status){
            ele = <Redirect to="/MyOrder" />
          }
          if(this.props.error){
            ele = <Modal modalclosed={this.errorHandler}>Some Error Occured...!</Modal>
          }
    return (
            <>
            {ele}
            </>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    
    status: state.Login.orderSuccess,
    error: state.Login.error,
  }
}
const mapDispatchToprops = (dispatch) => {
  return {
    authCheckout: () => dispatch(actions.authCheckState()),
    placeOrder: (name,
      mobileNo,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      pincode,
      paymentMethod) => dispatch(actions.order(name,mobileNo,addressLine1,addressLine2,landmark,city,state,pincode,paymentMethod)),
      errorNull: () => dispatch(actions.nullError())
  };
};
export default connect(mapStateToProps,mapDispatchToprops)(Checkout);
