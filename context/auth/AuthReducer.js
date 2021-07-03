
import {
    LOGIN_USUARIO,
    LOGOUT_USUARIO,
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

        default:
            return state;
    }

};