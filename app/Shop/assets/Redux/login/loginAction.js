import {USER_LOGIN,RE_LOGIN,LOG_OUT} from './loginActionTypes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export const FetchAndLoginData=(data,password)=>{
 console.log(data+' data fetched from fetch login');
return{
    type:RE_LOGIN,
    payload:{
        netdata:data,
        password:password
    }
}
}


export const loginAction=(data)=>{
    return{
        type:USER_LOGIN,
        payload:data
    }
}

export const reloginAction=(netadata,password)=>{
    console.log(password+'relogin password')
    return{
        type:RE_LOGIN,
        payload:null
    }
}

export const logoutAction=()=>{
    return{
        type:LOG_OUT
    }
}