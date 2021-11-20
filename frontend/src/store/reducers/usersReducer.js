import {
    LOGIN_USER_FAILURE, LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
    user: null,
    registerError: null,
    loginError: null,
    loadingLogin: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, user: action.payload, registerError: null};
        case REGISTER_USER_FAILURE:
            return {...state, registerError: action.payload};
        case LOGIN_USER_REQUEST:
            return {...state, loading: null};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.payload, loginError: null, loadingLogin: false};
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.payload, loadingLogin: false};
        case LOGOUT_USER:
            return {...state, user: null};
        default:
            return state;
    }
};

export default usersReducer;