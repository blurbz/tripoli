import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import BarLoader from "react-spinners/BarLoader";

import TextInput from "../components/common/Input";
import Button from "../components/common/Button";

import FormSuccess from "../components/FormSuccess";
import FormError from "../components/FormError";

import { publicFetch } from "../util/fetch";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);

  const submitCredentials = async (credentials) => {
    try {
      setLoginLoading(true);
      const { data } = await publicFetch.post("users/login", credentials);

      authContext.setAuthState(data);
      setLoginSuccess(data.message);
      setLoginError("");
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 1500);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setLoginError(data.message);
      setLoginSuccess(null);
    }
  };

  return (
    <>
      {redirectOnLogin && <Redirect to="/" />}
      <div className="flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitCredentials({ username, password });
          }}
          className="mx-auto"
        >
          {loginSuccess && <FormSuccess text={loginSuccess} />}
          {loginError && <FormError text={loginError} />}
          <h1 className="text-2xl text-center">Login</h1>
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
            placeholder="Password"
          />
          <br />
          <div className="flex flex-col gap-10">
            <BarLoader
              color={"#ffffff"}
              loading={loginLoading}
              size={500}
              css={`
                display: block;
                margin: 0 auto;
                background-color: rgba(37, 99, 235, 100);
                border-color: red;
              `}
            />
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
