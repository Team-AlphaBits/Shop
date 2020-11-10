import {INCRE_CART,INI_CART,DECRE_CART} from './cartActionTypes';

export const initializeCart = (total_product) => {
  return {
    type: INI_CART,
    payload: total_product
  };
};

export const incrementCart = () => {
  return {
    type: INCRE_CART,
  };
};

export const decrementCart = () => {
  return {
    type: DECRE_CART,
  };
};
