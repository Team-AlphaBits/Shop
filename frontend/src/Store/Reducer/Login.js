import * as actionTypes from '../Action/actionTypes';

const InitialState = {
    error: false,
    signuped: false,
    Data: null,
    FetchSuccess: false,
    detail: null,
    catData: null,
    desArr: null,
    resultData: null,
    TokenId: null,
    Cart: null,
    loginData: null,
    name: "User",
    Orders: null,
    orderSuccess: false,
}
const signupSuccess = (state,action) =>{
    return{
        ...state,
        signuped: true
    }
}
const signupFailed = (state,action) =>{
    return{
        ...state,
        signuped: false,
        error: true
    }
}
const errorNil = (state,action) =>{
    return{
        ...state,
        error: false
    }
}
const dataFetched = (state,action) =>{
    return{
        ...state,
        Data: action.data,
        desArr: action.desArr,
        FetchSuccess: true
    }
}
const getBYid = (state,action) =>{
    let dat = state.detail;
    if(action.data){
        dat = action.data
    }
    return{
      ...state,
      detail: dat
    }
}
const getBYcatId = (state,action) =>{
    return{
        ...state,
        catData: action.data
    }
}
const getBysearch = (state,action) =>{
    return{
        ...state,
        resultData: action.data
    }
}
const loggedIn = (state,action) =>{
    let some = state.loginData;
    let nam = state.name
    if(action.cartdata){
       some = action.cartdata
       nam = action.cartdata.user_name
    }
    return{
        ...state,
        TokenId: action.tokenid,
        loginData: some,
        name: nam
    }
}
const userDetail = (state,action) =>{
    return{
        ...state,
        name: action.name
    }
}
const logOut = (state,action) =>{
    return{
        ...state,
        TokenId: null,
        Cart: null,
    loginData: null,
    name: "User"
    }
}
const cartData = (state,action) =>{
    return{
        ...state,
        Cart: action.data,
        name: action.name
    }
}
const prevOrders = (state,action) =>{
    return{
        ...state,
        Orders: action.data
    }
}
const orderSuccesfull = (state,action) =>{
    return{
        ...state,
        orderSuccess: true
    }
}
const reducer = (state = InitialState, action) =>{
    switch(action.type){
         
        case(actionTypes.SIGNUPSUCCESS):  return signupSuccess(state,action);
        case(actionTypes.ERROR): return signupFailed(state,action);
        case(actionTypes.DATASUCCESS): return dataFetched(state,action);
        case(actionTypes.GETBYID): return getBYid(state,action);
        case(actionTypes.GETBYCATID): return getBYcatId(state,action);
        case(actionTypes.getBYSearch): return getBysearch(state,action);
        case(actionTypes.AUTH_SUCCESS): return loggedIn(state,action);
        case(actionTypes.AUTH_LOGOUT): return logOut(state,action);
        case(actionTypes.CART_DATA): return cartData(state,action);
        case(actionTypes.USER_DATA): return userDetail(state,action);
        case(actionTypes.PREV_ORDER): return prevOrders(state,action);
        case(actionTypes.ORDER_SUCCESS): return orderSuccesfull(state,action);
        case(actionTypes.ERRORNULL): return errorNil(state,action);
        default: return state;
    }
}

export default reducer;