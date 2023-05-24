import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      // Handle successful login
      console.log(response.data);
    } catch (error) {
      // Handle login error
      console.error(error);
    }

    console.log(email);
  };

  return (
    <div className='auth-form-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          value={email}
          type='email'
          placeholder='E-mail'
          id='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          value={password}
          type='password'
          placeholder='Password'
          id='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Log In</button>
      </form>
      <button onClick={() => props.onFormSwitch('register')}>
        Don't Have an Account yet? Register Here
      </button>
    </div>
  );
};

export default Login;
