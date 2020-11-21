import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const signupSuccess = () =>{
    return{
        type: actionTypes.SIGNUPSUCCESS,
    }
}
export const displayError = () =>{
    return{
        type: actionTypes.ERROR
    }
}
export const nullError = () =>{
    return{
        type: actionTypes.ERRORNULL
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
export const cartData = (data,name) =>{
    return{
        type: actionTypes.CART_DATA,
        data: data,
        name: name
    }
}
export const deleteProd = (id) =>{
    return dispatch=>{
     Axios.put("https://calm-garden-34154.herokuapp.com/api/removeProd/"+id,{},{
        headers:{
            jwt: localStorage.getItem('jwt')
        }
     })
        .then(res =>{
            dispatch(getCart())
        })
        .catch(err => dispatch(displayError()))
    }
}
export const orderSuccess = () =>{
    return{
        type: actionTypes.ORDER_SUCCESS,
    }
}
export const order = (name,mobileNo,addressLine1,addressLine2,landmark,city,state,pincode,paymentMethod) =>{
    return dispatch =>{
         Axios.post("https://calm-garden-34154.herokuapp.com/api/placeorder",{
            name: name,
            mobileNo: mobileNo,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            landmark: landmark,
            city: city,
            state: state,
            pincode: pincode,
            paymentMethod: paymentMethod
         },{
            headers:{
                jwt: localStorage.getItem('jwt')
            }
         })
         .then(res =>{
             dispatch(getCart())
             dispatch(orderSuccess())
         })
         .catch(err => dispatch(displayError()))
    }
}
export const myOrders = (data) =>{
    return{
        type: actionTypes.PREV_ORDER,
        data: data
    }
}
export const prevOrders = () =>{
    return dispatch =>{
        Axios.get("https://calm-garden-34154.herokuapp.com/api/prevOrder",{
            headers:{
                jwt: localStorage.getItem('jwt')
            }
        }).then(res =>{
            dispatch(myOrders(res.data))
        })
        .catch(err => dispatch(displayError()))
    }
}
export const userData = (data) =>{
    return{
        type: actionTypes.USER_DATA,
        name: data
    }
}
export const userDetails = () =>{
    return dispatch =>{
        Axios.get("https://calm-garden-34154.herokuapp.com/api/userDetails",{
            headers:{
                jwt: localStorage.getItem('jwt')
            }
        })
        .then(res => {
            dispatch(userData(res.data.userData.user_name))
        })
        .catch(err => err)
    }
}
export const addToCart = (id) =>{
    return dispatch =>{
    Axios.put("https://calm-garden-34154.herokuapp.com/api/add-to-cart/"+id,{},{
        headers:{
            jwt: localStorage.getItem('jwt')
        }
    })
         .then(res =>{
             dispatch(getCart())
         })
         .catch(err => dispatch(displayError()))
    }
}
export const changeValue = (id,val) =>{
    return dispatch=>{
  Axios.post("https://calm-garden-34154.herokuapp.com/api/incByVal/"+id+"/"+val,{},{
    headers:{
        jwt: localStorage.getItem('jwt')
    }
  })
    .then(res =>{
        dispatch(getCart())
    })
    .catch(err => dispatch(displayError()))
    }
}
export const getCart = () =>{
    return dispatch=>{
        Axios.get("https://calm-garden-34154.herokuapp.com/api/view-Cart/",{
            headers:{
                jwt: localStorage.getItem('jwt')
            }
        })
            .then(data =>{
                dispatch(cartData(data.data,data.data.cartData.user_name))
            })
            .catch(err => err)
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
             .catch(err => dispatch(displayError()))
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
             .catch(err => dispatch(displayError()));
    }
}
export const getById = (id) =>{
    return dispatch =>{
        Axios.get("https://calm-garden-34154.herokuapp.com/api/product/" + id)
             .then(data =>{
                 dispatch(detailData(data.data))
             })
             .catch(err => dispatch(displayError()))
    }
}
export const getBycatId = (id) =>{
    return dispatch =>{
        Axios.get("https://calm-garden-34154.herokuapp.com/api/category/" + id)
             .then(data =>{
                 dispatch(getData())
                 dispatch(catData(data.data))
             })
             .catch(err => dispatch(displayError()))
    }
}
export const authSuccess = (TokenID,cart) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenid: TokenID,
        cartdata: cart
    };
};

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    };
};
export const logOut = () =>{
    localStorage.removeItem('jwt');
    localStorage.removeItem('expirationDate');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout =(expireTime) =>{
    return dispatch => {
    setTimeout(() =>{
    dispatch(logOut());
    },expireTime*1000)
    }
}
export const Login = (email,password) =>{
    return dispatch=>{
        let userInfo ={
            email: email,
            password: password
        }
        Axios.post("https://cors-anywhere.herokuapp.com/https://calm-garden-34154.herokuapp.com/api/login",userInfo)
             .then(res =>{
                 let expirationDate = new Date(new Date().getTime() + 7200*1000)
                 localStorage.setItem('jwt',res.data.token)
                 localStorage.setItem('expirationDate',expirationDate)
                 dispatch(authSuccess(res.data.token,res.data.userData))
                 dispatch(checkAuthTimeout(7200))
             })
             .catch(err => dispatch(displayError()))
    }
}
export const Signup = (username, email, password) =>{
    return dispatch =>{
        let userData = {
            user_name: username,
            email: email,
            password: password
        }
        Axios.post("https://cors-anywhere.herokuapp.com/https://calm-garden-34154.herokuapp.com/api/register",userData)
             .then(res =>{
                 dispatch(signupSuccess())
             })
             .catch(err =>{
                 dispatch(displayError())
             })
    }
}
export const authCheckState = () =>{
    return dispatch =>{
       const tokenid = localStorage.getItem('jwt');
       if(!tokenid){
           dispatch(logOut());
       }
       else {
           const expiration = new Date(localStorage.getItem('expirationDate'));
           if(expiration > new Date()){
               dispatch(authSuccess(tokenid));
               dispatch(checkAuthTimeout((expiration.getTime() - new Date().getTime())/1000));
           }
           else{
               dispatch(logOut());
           }
       }
    }
}