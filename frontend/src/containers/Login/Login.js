import React, { Component } from "react";
import Lform from "../../components/Form/Loginform";
import Form from "../../components/Form/Signupform";
import { connect } from "react-redux";
import {Redirect} from 'react-router'
import * as actions from "../../Store/Action/index";
import Spinner from '../../components/spinner/spinner'
import Modal from '../../components/Modal/Modal'

class Login extends Component {
  state = {
    login: true,
    usernameValue: "",
    emailValue: "",
    passwordValue: "",
    confirmpasswordValue: "",
    showSpinner: false,
    passMatch: true
  };
  toggle = () => {
    this.setState((prev) => {
      return { login: !prev.login };
    });
  };
  callFunction = (event) => {
    event.preventDefault();
    if(this.state.passwordValue === this.state.confirmpasswordValue){
      this.props.forSignup(
        this.state.usernameValue,
        this.state.emailValue,
        this.state.passwordValue
      );
      this.setState({
        usernameValue: "",
      emailValue: "",
      passwordValue: "",
      confirmpasswordValue: "",
      showSpinner: true
      })
    }
    else{
      this.setState({passMatch: false})
    }
  };
  callLogin = (event) => {
    event.preventDefault();
    this.props.forLogin(
      this.state.emailValue,
      this.state.passwordValue,
      this.props.cookies
    );
    this.setState({
      usernameValue: "",
    emailValue: "",
    passwordValue: "",
    confirmpasswordValue: "",
    showSpinner: true
    })
  };
  onChangeHandler = (event, field) => {
    if (field === "usernameValue") {
      this.setState({
        usernameValue: event.target.value,
      });
    } else if (field === "emailValue") {
      this.setState({
        emailValue: event.target.value,
      });
    } else if (field === "passwordValue") {
      this.setState({
        passwordValue: event.target.value,
      });
    } else if (field === "confirmpasswordValue") {
      this.setState({
        confirmpasswordValue: event.target.value,
      });
    }
  };
errorHandler = () =>{
  this.setState({showSpinner: false, passMatch: true})
  this.props.errorNull();
}
  render() {
    // if(this.props.signedUp){
    //   return this.toggle
    // }
    let form = (
      <Lform
        login={this.toggle}
        valueEmail={this.state.emailValue}
        changeEmail={(event) => this.onChangeHandler(event, "emailValue")}
        valuePassword={this.state.passwordValue}
        changePassword={(event) => this.onChangeHandler(event, "passwordValue")}
        clicked={this.callLogin}
      />
    );
    if (!this.state.login) {
      form = (
        <Form
          login={this.toggle}
          valueUser={this.state.usernameValue}
          changeUser={(event) => this.onChangeHandler(event, "usernameValue")}
          valueEmail={this.state.emailValue}
          changeEmail={(event) => this.onChangeHandler(event, "emailValue")}
          valuePassword={this.state.passwordValue}
          changePassword={(event) =>
            this.onChangeHandler(event, "passwordValue")
          }
          valueCnfrmPassword={this.state.confirmpasswordValue}
          changeCnfrmPassword={(event) =>
            this.onChangeHandler(event, "confirmpasswordValue")
          }
          clicked={this.callFunction}
        />
      );
    }
    if(this.state.showSpinner){
      form = <Spinner />
    }
    if(this.props.isAuthenticated){
      form= <Redirect to="/" />
    }
    if(this.props.error || !this.state.passMatch){
      if(this.state.login){
        form = <Modal modalclosed={this.errorHandler}>INVALID E-mail or Password</Modal>
      }
      else{
        form = <Modal modalclosed={this.errorHandler}>{!this.state.passMatch ? "Passwords does not match" : "E-mail is already Present"}</Modal>
      }
    }
    if(this.props.RegisterSuccessfully){
      window.location.reload();
    }
    return <div>
      {form}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Login.TokenId !== null,
    error: state.Login.error,
    RegisterSuccessfully: state.Login.signuped
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    forSignup: (username, email, password) => {
      dispatch(actions.Signup(username, email, password));
    },
    forLogin: (email, password, cookies) => {
      dispatch(actions.Login(email, password, cookies));
    },
    errorNull: () => dispatch(actions.nullError())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
