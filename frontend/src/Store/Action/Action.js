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
export const dataFetched = (data,desArr) =>{
    return{
        type: actionTypes.DATASUCCESS,
        data: data,
        desArr: desArr
    }
}
export const detailData = (data) =>{
    return{
        type: actionTypes.GETBYID,
        data: data
    }
}
export const addTocartSuccess =() =>{
    return{
        type: actionTypes.ADDTOCART
    }
}
export const getCart = (cookies) =>{
    console.log(cookies)
    return dispatch=>{
        Axios.get("https://calm-garden-34154.herokuapp.com/api/view-Cart/",{
            headers:{
                jwt: localStorage.getItem('jwt')
            }
        })
             .then(data =>{
                 console.log(data)
             })
             .catch(err => console.log(err))
    }
}
export const afterSearch = (data) =>{
    return {
        type: actionTypes.getBYSearch,
        data: data
    }
}
export const getSearch =(des) =>{
    return dispatch=>{
        // const queryParam = '?des='
        Axios.get("https://calm-garden-34154.herokuapp.com/api/getSearchResults?query="+des)
             .then(res =>{
                dispatch(afterSearch(res))
             })
             .catch(err => console.log(err))
    }
}
export const catData = (data) =>{
    return {
        type: actionTypes.GETBYCATID,
        data: data
    }
}
export const getData = () =>{
    let desArr;
    return dispatch =>{
        Axios.get("https://calm-garden-34154.herokuapp.com/api/home")
             .then(data =>{
                 desArr = data.data.productData.map(prod => {
                      return prod.short_desc
                 })
                 dispatch(dataFetched(data.data,desArr))
             })
             .catch(err => console.log(err));
    }
}
export const getById = (id) =>{
    return dispatch =>{
        Axios.get("https://calm-garden-34154.herokuapp.com/api/product/" + id)
             .then(data =>{
                 dispatch(detailData(data.data))
             })
             .catch(err => console.log(err))
    }
}
export const getBycatId = (id) =>{
    return dispatch =>{
        dispatch(getData())
        Axios.get("https://calm-garden-34154.herokuapp.com/api/category/" + id)
             .then(data =>{
                 dispatch(catData(data.data))
             })
             .catch(err => console.log(err))
    }
}
export const Login = (email,password,cookies) =>{
    return dispatch=>{
        let userInfo ={
            email: email,
            password: password
        }
        Axios.post("https://cors-anywhere.herokuapp.com/https://calm-garden-34154.herokuapp.com/api/login",userInfo)
             .then(res =>{
                 console.log(res)
                 localStorage.setItem('jwt',res.data.token)
                 console.log(cookies)
             })
             .catch(err => console.log(err))
    }
}
export const Signup = (username, email, password) =>{
    return dispatch =>{
        let userData = {
            user_name: username,
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