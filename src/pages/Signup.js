import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import BarLoader from "react-spinners/BarLoader";

import TextInput from "../components/common/Input";
import Button from "../components/common/Button";

import FormSuccess from "../components/FormSuccess";
import FormError from "../components/FormError";

import { publicFetch } from "../util/fetch";
import { AuthContext } from "../context/AuthContext";

function SignUp() {
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);

  const submitCredentials = async (credentials) => {
    try {
      setLoginLoading(true);
      const { data } = await publicFetch.post("users/register", credentials);

      authContext.setAuthState(data);
      setLoginSuccess(data.message);
      setLoginError("");
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 850);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setLoginError(data.message);
      setLoginSuccess(null);
    }
  };

  return (
    <div className="flex">
      <form
        className="mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          submitCredentials({ username, email, password });
        }}
      >
        {redirectOnLogin && <Redirect to="/" />}
        {loginSuccess && <FormSuccess text={loginSuccess} />}
        {loginError && <FormError text={loginError} />}
        <h1 className="text-2xl text-center">Sign Up</h1>
        <TextInput
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
        />
        <TextInput
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
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
  );
}

export default SignUp;
