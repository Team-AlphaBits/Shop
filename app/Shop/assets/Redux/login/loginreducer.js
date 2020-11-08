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

/*loginFuncion = (email, password) => {
  var myemail = email;
  var myPassword = password;

  axios
    .post('https://calm-garden-34154.herokuapp.com/api/login', {
      email: myemail,
      password: myPassword,
    })
    .then((res) => {
      console.log('then block')
      /*return{
        email: res.data.userData.email,
        password: myPassword,
        username: res.data.userData.user_name,
      };
      console.log(res.data.userData.email+'main network call')
    })
    .catch((e) => {
      console.log(e + 'network error');
    });
};*/

/*RetriveCredentialAndLogin = async () => {
  console.log('relogin called');
  try {
    const values = await AsyncStorage.multiGet(['email', 'password']);
    myData.storageData = values;
    console.log(values + 'between both function');
    //networking
    var network =await axios
    .post('https://calm-garden-34154.herokuapp.com/api/login', {
      email: values[0][1],
      password: values[1][1],
    })
    //networking
    console.log(network.data.userData.email+'login return');
    console.log(myData.storageData + 'mydata async output');
   // console.log(myData.networkData + 'mydata network data');
   return{networkdata: network.data.userData,password:values[1][1]}

  } catch (e) {
    // read error
    console.log(e + 'storage error');
    return false;
  }
};*/



removeFew = async () => {
  const keys = ['email', 'password'];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    // remove error
    console.log(e);
  }

  console.log('Done');
};

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
            console.log(action.payload.netdata.email+' case log')
      return{
        ...state,
        email:action.payload.netdata.email,
        password:action.payload.password,
        username:action.payload.netdata.user_name,
        isLoggedIn:true
      }
       break;

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
