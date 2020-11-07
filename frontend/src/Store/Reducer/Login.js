import * as actionTypes from '../Action/actionTypes';

const InitialState = {
    error: null,
    signuped: false,
    Data: null,
    FetchSuccess: false,
    detail: null
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
        FetchSuccess: true
    }
}
const getBYid = (state,action) =>{
    return{
      ...state,
      detail: action.data
    }
}
const reducer = (state = InitialState, action) =>{
    switch(action.type){
         
        case(actionTypes.SIGNUPSUCCESS):  return signupSuccess(state,action);
        case(actionTypes.SIGNUPFAILED): return signupFailed(state,action);
        case(actionTypes.DATASUCCESS): return dataFetched(state,action);
        case(actionTypes.GETBYID): return getBYid(state,action);
        default: return state;
    }
}

export default reducer;