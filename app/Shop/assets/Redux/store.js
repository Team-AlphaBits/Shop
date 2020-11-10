import {createStore, combineReducers} from 'redux';
import LoginReducer from './login/loginreducer';
import cartReducer from './cart/cartReducer';

//combining all the reducers because createStore only take single reducer
const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
  cartReducer:cartReducer
});

const store = createStore(rootReducer);

export default store;
