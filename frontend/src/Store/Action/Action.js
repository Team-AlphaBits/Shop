import * as actionTypes from './actionTypes';
import Axios from 'axios';


export const signupSuccess = () =>{
    return{
        type: actionTypes.SIGNUPSUCCESS,
    }
}
export const signupFailed = (error) =>{
    return{
        type: actionTypes.SIGNUPFAILED,
        error: error
    }
}
export const dataFetched = (data) =>{
    return{
        type: actionTypes.DATASUCCESS,
        data: data
    }
}
export const getData = () =>{
    return dispatch =>{
        Axios.get("https://cors-anywhere.herokuapp.com/https://calm-garden-34154.herokuapp.com/api/home")
             .then(data =>{
                 dispatch(dataFetched(data.data))
             })
             .catch(err => console.log(err));
    }
}
export const Signup = (username, email, password) =>{
    return dispatch =>{
        let userData = {
            username: username,
            email: email,
            password: password
        }
        console.log(userData)
        Axios.post("https://cors-anywhere.herokuapp.com/https://calm-garden-34154.herokuapp.com/api/register",userData)
             .then(res =>{
                 console.log(res);
                 dispatch(signupSuccess())
             })
             .catch(err =>{
                 dispatch(signupFailed(err))
             })
    }
}