import React,{Component} from 'react';
import Lform from '../../components/Form/Loginform';
import Form from '../../components/Form/Signupform';
import {connect} from 'react-redux';
import * as actions from '../../Store/Action/index';


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
