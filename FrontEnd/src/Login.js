import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  // const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        'http://localhost:8000/login', { username, password },
        { headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' } });
      const token = response.data.access_token; 
      localStorage.setItem('token', token);
      // navigate('/landing'); // Redirect to the profile page after successful login
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className = 'auth-form-container'>
      <form onSubmit = {login}>
        <label htmlFor = 'email'>Email</label>
        <input
          value = {username}
          type = 'email'
          placeholder = 'email'
          id = 'email'
          name = 'email'
          onChange = {(e) => setUsername(e.target.value)}
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
      
      <button onClick={() => props.onFormSwitch('Register2')}>
        Don't Have an Account yet? Register Here
      </button>
    </div>
  );
};

export default Login;
