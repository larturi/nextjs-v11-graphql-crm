import React, { useReducer, useEffect } from "react";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import {
  LOGIN_USUARIO,
  LOGOUT_USUARIO,
  CHECK_TOKEN_LOCALSTORAGE,
} from "../../types";

const AuthState = ({ children }) => {
  useEffect(() => {
    checkTokenLocalStorage();
  }, []);

  const initialState = {
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = () => {
    dispatch({
      type: LOGIN_USUARIO,
      payload: true,
    });
  };

  const logout = () => {
    dispatch({
      type: LOGOUT_USUARIO,
      payload: false,
    });
  };

  const checkTokenLocalStorage = () => {
    if (localStorage.getItem("token")) {
      dispatch({
        type: CHECK_TOKEN_LOCALSTORAGE,
        payload: true,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        checkTokenLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
