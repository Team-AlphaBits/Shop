import { createStore,combineReducers} from 'redux';
import cakeReducer from './cake/cakeReducers';


//combining all the reducers because createStore only take single reducer
const rootReducer=combineReducers({
    cake:cakeReducer,
})

const store = createStore(rootReducer);

export default store;