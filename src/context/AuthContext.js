import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Cookies } from "js-cookie";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const token = Cookies.get("token");
  const userInfo = Cookies.get("userInfo");
  const expiresAt = Cookies.get("expiresAt");

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    Cookies.set("token", token);
    Cookies.set("userInfo", JSON.stringify(userInfo));
    Cookies.set("expiresAt", expiresAt);
    setAuthState({
      token,
      userInfo,
      expiresAt,
    });
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userInfo");
    Cookies.remove("expiresAt");
    setAuthState({
      token: null,
      expiresAt: null,
      userInfo: {},
    });
    history.push("/login");
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const isAdmin = () => {
    return authState.userInfo.role === "admin";
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        isAdmin,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
