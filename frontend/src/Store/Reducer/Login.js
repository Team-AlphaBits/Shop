import * as actionTypes from '../Action/actionTypes';

const InitialState = {
    error: null,
    signuped: false,
    Data: null,
    FetchSuccess: false,
    detail: null,
    catData: null,
    desArr: null,
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
        error: action.error
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
    return{
      ...state,
      detail: action.data
    }
}
const getBYcatId = (state,action) =>{
    return{
        ...state,
        catData: action.data
    }
}
const reducer = (state = InitialState, action) =>{
    switch(action.type){
         
        case(actionTypes.SIGNUPSUCCESS):  return signupSuccess(state,action);
        case(actionTypes.SIGNUPFAILED): return signupFailed(state,action);
        case(actionTypes.DATASUCCESS): return dataFetched(state,action);
        case(actionTypes.GETBYID): return getBYid(state,action);
        case(actionTypes.GETBYCATID): return getBYcatId(state,action);
        default: return state;
    }
}

export default reducer;