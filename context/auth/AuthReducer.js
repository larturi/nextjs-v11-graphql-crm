
import {
    LOGIN_USUARIO,
    LOGOUT_USUARIO,
    CHECK_TOKEN_LOCALSTORAGE
} from '../../types';

export default (state, action) => {

    switch (action.type) {

        case LOGIN_USUARIO:
            return {
                ...state,
                isAuthenticated: true
            }

        case LOGOUT_USUARIO:
            return {
                ...state,
                isAuthenticated: false,
            }

        case CHECK_TOKEN_LOCALSTORAGE:
            return {
                ...state,
                isAuthenticated: action.payload,
            }

        default:
            return state;
    }

};