import {createStore, combineReducers} from 'redux';
import LoginReducer from './login/loginreducer';

//combining all the reducers because createStore only take single reducer
const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
});

const store = createStore(rootReducer);

export default store;
