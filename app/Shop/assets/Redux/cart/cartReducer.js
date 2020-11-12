import {INI_CART, INCRE_CART, DECRE_CART} from './cartActionTypes';

initialState = {
  total_product: 0,
};

export default cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case INI_CART:
      return {
        ...state,
        total_product: action.payload,
      };

    case INCRE_CART:
      return {
        ...state,
        total_product: state.total_product + 1,
      };
      break;

    case DECRE_CART:
      return {
        ...state,
        total_product: state.total_product - 1,
      };
    default:
      return state;
  }
};
