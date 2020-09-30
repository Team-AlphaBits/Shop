import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBInput,
  MDBModal,
  MDBModalBody,
} from "mdbreact";
import classes from "./Signup.module.css";

class Signup extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    console.log(this.state.modal);
    let ShowAlert = null;
    if (this.state.modal) {
      ShowAlert = (
        <MDBContainer className={classes.modal}>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalBody>Logged in successfully !...</MDBModalBody>
          </MDBModal>
        </MDBContainer>
      );
    }
    return (
      <div className={classes.uperContainer}>
        {ShowAlert}
        <MDBContainer className={classes.login}>
          <MDBRow>
            <MDBCol md="6">
              <MDBCard
                className="card-image"
                style={{
                  backgroundImage:
                    "url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)",
                  width: "28rem",
                }}
              >
                <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                  <div className="text-center">
                    <h3 className="white-text mb-5 mt-4 font-weight-bold">
                      <strong>SIGN</strong>
                      <a href="#!" className="green-text font-weight-bold">
                        <strong> UP</strong>
                      </a>
                    </h3>
                  </div>
                  <MDBInput
                    label="Username"
                    group
                    type="text"
                    validate
                    labelClass="white-text"
                  />
                  <MDBInput
                    label="Your email"
                    group
                    type="text"
                    validate
                    labelClass="white-text"
                  />
                  <MDBInput
                    label="Your password"
                    group
                    type="password"
                    validate
                    labelClass="white-text"
                  />
                  <MDBInput
                    label="Confirm password"
                    group
                    type="password"
                    validate
                    labelClass="white-text"
                  />
                  <div className="md-form pb-3">
                    <MDBInput
                      label={
                        <>
                          Accept the&nbsp;
                          <a href="#!" className="green-text font-weight-bold">
                            Terms and Conditions
                          </a>
                        </>
                      }
                      type="checkbox"
                      id="checkbox1"
                      labelClass="white-text"
                    />
                  </div>
                  <MDBRow className="d-flex align-items-center mb-4">
                    <div className="text-center mb-3 col-md-12">
                      <MDBBtn
                        color="success"
                        rounded
                        type="button"
                        className="btn-block z-depth-1"
                        onClick={this.toggle}
                      >
                        Register
                      </MDBBtn>
                    </div>
                  </MDBRow>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Signup;
