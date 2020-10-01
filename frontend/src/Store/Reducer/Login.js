import * as actionTypes from '../Action/actionTypes';

const initState ={
    error: null,
    signuped: false
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
        error: action.error
    }
}

const reducer = (state = initState, action) =>{
    switch(action.type){
         
        case(actionTypes.SIGNUPSUCCESS):  return signupSuccess(state,action);
        case(actionTypes.SIGNUPFAILED): return signupFailed(state,action);
        default: return state;
    }
}

export default reducer;