import React, { useReducer } from 'react';

import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

import {
    LOGIN_USUARIO,
    LOGOUT_USUARIO
} from '../../types';

const AuthState = ({children}) => {

    const initialState = {
        isAuthenticated: false
    };

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const login = () => {
        dispatch({
            type: LOGIN_USUARIO,
            payload: true
        });
    };

    const logout = () => {
        dispatch({
            type: LOGOUT_USUARIO,
            payload: false
        });
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: state.isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )

};

export default AuthState;