import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import classes from "./Signupform.module.css";
class Login extends Component {

  render() {
    return (
      <div className={classes.uperContainer}>
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
                        value={this.props.valueUser}
                        onChange={this.props.changeUser}
                        validate
                        error="wrong"
                        success="right"
                      />
                      <MDBInput
                        label="Your email"
                        icon="envelope"
                        group
                        type="email"
                        value={this.props.valueEmail}
                        onChange={this.props.changeEmail}
                        validate
                        error="wrong"
                        success="right"
                      />

                      <MDBInput
                        label="Your password"
                        icon="lock"
                        group
                        type="password"
                        value={this.props.valuePassword}
                        onChange={this.props.changePassword}
                        validate
                      />
                      <MDBInput
                        label="Confirm password"
                        icon="lock"
                        group
                        value={this.props.valueCnfrmPassword}
                        onChange={this.props.changeCnfrmPassword}
                        type="password"
                        validate
                      />
                    </div>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn color="cyan" type="submit" onClick={this.props.clicked}>
                        Register
                      </MDBBtn>
                    </div>
                  </form>
                  <MDBBtn color="red" type="button" onClick={this.props.login}>
                        Login
                      </MDBBtn>
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