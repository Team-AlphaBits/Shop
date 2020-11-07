import {USER_LOGIN, RE_LOGIN, LOG_OUT} from './loginActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

initialState = {
  username: null,
  email: null,
  password: null,
  isLoggedIn: false,
};

saveCredentialToDevice = async (data) => {
  var email = data.userData.email;
  var password = data.password;
  const firstPair = ['email', email.toString()];
  const secondPair = ['password', password.toString()];

  try {
    await AsyncStorage.multiSet([firstPair, secondPair]);
  } catch (e) {
    //save error
    console.log(e);
  }
};

loginFuncion =async(email, password) => {
  var myemail = email;
  var myPassword = password;
  if (myemail != '' && myPassword != '') {
    const res=await  axios
      .post('https://calm-garden-34154.herokuapp.com/api/login', {
        email: myemail,
        password: myPassword,
      })

      return res.data.userData

  } else {
    return false;
  }
};

RetriveCredentialAndLogin =async () => {
    let values;
    var data=null;
    console.log('relogin called');
    try {
      values = await AsyncStorage.multiGet(['email', 'password']);
      data=await loginFuncion(values[0][1],values[1][1]);
      console.log(values+'async output')
      console.log(data+'network data')
    } catch (e) {
      // read error
      //data= false;
      console.log(e);
    }

    console.log(values[0][1]+'outof try block')
    return values;
};

removeFew = async () => {
    const keys = ['email', 'password']
    try {
      await AsyncStorage.multiRemove(keys)
    } catch(e) {
      // remove error
      console.log(e);
    }
  
    console.log('Done')
  }
  
  

clearCredential = () => {
  removeFew();

  axios
    .get('https://calm-garden-34154.herokuapp.com/api/logout')
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

export default LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      saveCredentialToDevice(action.payload);
      return {
        ...state,
        username: action.payload.userData.user_name,
        password: action.payload.password,
        email: action.payload.userData.email,
        isLoggedIn: true,
      };

    case RE_LOGIN:
      var myCredential ;
       RetriveCredentialAndLogin().then((data)=>{
          myCredential=data;
      })
      console.log(myCredential+'case output');
      myCredential=false;
      if (myCredential!=false) {
        return {
          ...state,
          username: myCredential.userData.user_name,
          email: myCredential.userData.email,
          password: myCredential.password,
          isLoggedIn: true,
        };
      } else {
        return {
          ...state,
          username: null,
          email: null,
          password: null,
          isLoggedIn: false,
        };
      }
    case LOG_OUT:
      clearCredential();
      return {
        ...state,
        username: null,
        email: null,
        password: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
