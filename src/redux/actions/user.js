import { LOGIN, LOGOUT, EDIT_USER } from './constants';

export const addUser = (accessData) => {
  return (dispatch) => {
    dispatch({ type: LOGIN, data: accessData });
  };
};

export const removeUser = () => {
  return (dispatch) => {
    return dispatch({ type: LOGOUT });
  };
};

export const editUser = (accessData) => {
  return (dispatch) => {
    return dispatch({ type: EDIT_USER, data: accessData });
  };
};
