import {USER_LOGIN, RE_LOGIN, LOG_OUT} from './loginActionTypes';

export const FetchAndLoginData = (data, password) => {
  console.log(data + ' data fetched from fetch login');
  return {
    type: RE_LOGIN,
    payload: {
      netdata: data,
      password: password,
    },
  };
};

export const loginAction = (data) => {
  return {
    type: USER_LOGIN,
    payload: data,
  };
};

export const logoutAction = () => {
  return {
    type: LOG_OUT,
  };
};
