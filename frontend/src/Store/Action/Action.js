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
export const getData = () =>{
    return dipatch =>{
        Axios.get('url')
             .then(data =>{
                 console.log(data)
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
        Axios.post("https://calm-garden-34154.herokuapp.com/api/register",userData)
             .then(res =>{
                 console.log(res);
                 dispatch(signupSuccess())
             })
             .catch(err =>{
                 dispatch(signupFailed(err))
             })
    }
}