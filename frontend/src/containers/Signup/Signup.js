import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBAlert,
  MDBModalHeader,
  MDBModalBody,
  MDBModal,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import classes from "./Signup.module.css";
class Login extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState((prev) => {
      return {
        modal: !prev.modal,
      };
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
              <MDBCard>
                <MDBCardBody>
                  <form>
                    <p className="h4 text-center py-4">Sign up</p>
                    <div className="grey-text">
                      <MDBInput
                        label="Username"
                        icon="user"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                      />
                      <MDBInput
                        label="Your email"
                        icon="envelope"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                      />

                      <MDBInput
                        label="Your password"
                        icon="lock"
                        group
                        type="password"
                        validate
                      />
                      <MDBInput
                        label="Confirm password"
                        icon="lock"
                        group
                        type="password"
                        validate
                      />
                    </div>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn color="cyan" type="submit" onClick={this.toggle}>
                        Register
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
export default Login;
