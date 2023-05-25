import React, { useState, useContext } from "react";

import { UserContext } from "./context/UserContext";

export const Login2 = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch("http://localhost:8000/api/token", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      //setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className = 'auth-form-container'>
      <form onSubmit = {handleSubmit}>
        <label htmlFor = 'email'>Email</label>
        <input
          value = {email}
          type = 'email'
          placeholder = 'Email'
          id = 'email'
          name = 'email'
          onChange = {(e) => setEmail(e.target.value)}
        />

        <label htmlFor = 'password'>Password</label>
        <input
          value = {password}
          type = 'password'
          placeholder = 'Password'
          id = 'password'
          name = 'password'
          onChange = {(e) => setPassword(e.target.value)}
        />

        <button type = 'submit'>Log In</button>
      </form>
      
      <button onClick={() => props.onFormSwitch('register')}>
        Don't Have an Account yet? Register Here
      </button>
    </div>
  );
};

export default Login2;
