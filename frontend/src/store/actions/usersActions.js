import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {toast} from "react-toastify";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, payload: user});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, payload: error});

export const loginUserRequest = data => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = data => ({type: LOGIN_USER_SUCCESS, payload: data});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});

export const registerUser = userData => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess(response.data));
            dispatch(historyPush('/'));

        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(registerUserFailure(error.response.data));
            } else {
                dispatch(registerUserFailure({global: 'No internet'}));
            }
        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data.user));
            dispatch(historyPush('/'));
            toast.success('LoginUser successful');
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(loginUserFailure(error.response.data));
            } else {
                dispatch(loginUserFailure({global: 'No internet'}));
            }
        };
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
      const headers = {
          "Authorization": getState().users.user.token,
      };
      await axiosApi.delete('/users/sessions', {headers});
      dispatch({type: LOGOUT_USER});
      dispatch(historyPush('/'));
    };
};
