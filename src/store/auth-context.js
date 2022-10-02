import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('idToken')
    const [token, setToken] = useState(initialToken)

    const loginHandler = token => {
        setToken(token)
        localStorage.setItem('idToken', token)
    }
  const authContextValue = {
    token: token,
    isLoggedIn: false,
    login: loginHandler,
    logout: () => {},
  };
  return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>;
};
export default AuthContext;
