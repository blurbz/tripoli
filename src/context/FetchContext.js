import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = authContext.authState.token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code = error && error?.response ? error?.response.status : 0;
      if (code === 401 || code === 403) {
        console.log("error code", code);
      }
      return Promise.reject(error);
    }
  );

  //   useEffect(() => {
  //     const getCSRFToken = async () => {
  //       const { data } = await authAxios.get("/csrf-token");
  //       authAxios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
  //     };

  //     getCSRFToken();
  //   }, []);

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
