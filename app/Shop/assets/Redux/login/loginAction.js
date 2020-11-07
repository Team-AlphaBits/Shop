import {USER_LOGIN,RE_LOGIN,LOG_OUT} from './loginActionTypes';

export const loginAction=(data)=>{
    return{
        type:USER_LOGIN,
        payload:data
    }
}

export const reloginAction=()=>{
    return{
        type:RE_LOGIN
    }
}

export const logoutAction=()=>{
    return{
        type:LOG_OUT
    }
}