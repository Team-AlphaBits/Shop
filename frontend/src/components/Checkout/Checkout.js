import React, { Component } from "react";
import classes from "./Checkout.module.css";
import { MDBContainer, MDBInput, MDBModal, MDBModalBody } from "mdbreact";
import { Button, Form, Col } from "react-bootstrap";

class Checkout extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    let ShowAlert = null;
    if (this.state.modal) {
      ShowAlert = (
        <MDBContainer className={classes.modal}>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalBody>Your order placed successfully !...</MDBModalBody>
          </MDBModal>
        </MDBContainer>
      );
    }
    let cls = ["form-check form-check-inline", classes.radio];
    let size = ["form-check-input", classes.btn];
    let text = ["form-check-input", classes.text];
    return (
      <div className={classes.maincontainer}>
        <div className={classes.container}>
          <p className={classes.heading}>FILL YOUR ADDRESS</p>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Full name</Form.Label>
                <Form.Control type="email" placeholder="Enter your Name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="password" placeholder="Enter number" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Address
            </Button>
          </Form>
          <div className={classes.rdBtn}>
            <p className={classes.payment}>Select your Payment option</p>
            <div className={cls.join(" ")}>
              <input
                className={size.join(" ")}
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
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
                value="option2"
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
                value="option2"
              />
              <label className={text.join(" ")} for="inlineRadio2">
                UPI Payments
              </label>
            </div>
            <button className={classes.order} onClick={this.toggle}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
