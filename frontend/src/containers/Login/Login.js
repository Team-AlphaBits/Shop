<<<<<<< HEAD
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
import classes from "./Login.module.css";
class Login extends Component {
  state = {
    modal: false,
  };
=======
import React,{Component} from 'react';
import Lform from '../../components/Form/Loginform';
import Form from '../../components/Form/Signupform';
import {connect} from 'react-redux';
import * as actions from '../../Store/Action/index';

>>>>>>> 24a64e13cfbe2ff49fafee2bd7a5f0c2ec6cdb9c

class Login extends Component{
  state={
     login: true,
     usernameValue: '',
     emailValue: '',
     passwordValue: '',
     confirmpasswordValue: ''
  }
  toggle = () =>{
    this.setState(prev =>{
      return { login: !prev.login}
    })
  }
  callFunction = (event) =>{
    event.preventDefault();
    this.props.forSignup(this.state.usernameValue,this.state.emailValue,this.state.passwordValue)
    this.setState(prev =>{
      return { login: !prev.login}
    })
  }
  onChangeHandler = (event,field) =>{
    if(field==='usernameValue'){
        this.setState({
          usernameValue: event.target.value
        })
  }
  else if(field==='emailValue'){
    this.setState({
<<<<<<< HEAD
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
      <div className={classes.up}>
        <div className={classes.uperContainer}>
          {ShowAlert}
          <MDBContainer className={classes.login}>
            <MDBRow>
              <MDBCol md="6">
                <MDBCard>
                  <MDBCardBody>
                    <form>
                      <p className="h4 text-center py-4">Sign in</p>
                      <div className="grey-text">
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
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn
                          color="cyan"
                          type="submit"
                          onClick={this.toggle}
                        >
                          Sign in
                        </MDBBtn>
                        <MDBBtn color="red" type="submit">
                          Sign-up
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
export default Login;
=======
      emailValue: event.target.value
    })
  }
  else if(field==='passwordValue'){
    this.setState({
      passwordValue: event.target.value
    })
  }
  else if(field==='confirmpasswordValue'){
    this.setState({
      confirmpasswordValue: event.target.value
    })
  }
}

  render(){
    // if(this.props.signedUp){
    //   return this.toggle
    // }
    let form = <Lform 
    login={this.toggle}
    valueEmail = {this.state.emailValue}
    changeEmail = {(event) =>this.onChangeHandler(event,'emailValue')}
    valuePassword = {this.state.passwordValue}
    changePassword = {(event) => this.onChangeHandler(event,'passwordValue')}
    />
    if(!this.state.login){
      form = <Form 
      login = {this.toggle}
      valueUser = {this.state.usernameValue}
      changeUser = {(event) => this.onChangeHandler(event,'usernameValue')}
      valueEmail = {this.state.emailValue}
      changeEmail = {(event) =>this.onChangeHandler(event,'emailValue')}
      valuePassword = {this.state.passwordValue}
      changePassword = {(event) => this.onChangeHandler(event,'passwordValue')}
      valueCnfrmPassword = {this.state.confirmpasswordValue}
      changeCnfrmPassword = {(event) => this.onChangeHandler(event,'confirmpasswordValue')}
      clicked = {this.callFunction}
      />
    }
    return <div>
      {form}
  </div>
  }
}
const mapStateToProps = (state) =>{
  return{
    signedUp: state.signuped
  }
}
const mapDispatchToProps = (dispatch) =>{
 return{
    forSignup: (username,email,password) => dispatch(actions.Signup(username,email,password))
 }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
>>>>>>> 24a64e13cfbe2ff49fafee2bd7a5f0c2ec6cdb9c
