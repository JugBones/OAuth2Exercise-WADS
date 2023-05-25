import React, { useState } from 'react';
// import { useNavigate } from "react-router";
// import { UserContext } from './context/UserContext';
import ErrorMessage from "./ErrorMessage";
import axios from 'axios';

export const Register2 = (props) => {
    // const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [full_name, setFullName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const signup = async () => {
        try {
          const response = await axios.post(
            'http://localhost:8000/signup',
            { email, full_name, password }, // Include the "password" field in the request payload
            { headers: { 'content-type': 'application/json' } }
          );
          const token = response.data.access_token; // Assuming the token field is "access_token"
          localStorage.setItem('token', token);
        //   navigate('/landing'); // Redirect to the profile page after successful
    
        } catch (error) {
          if (error.response) {
            console.error('Error response:', error.response.data);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error:', error.message);
          }
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword && password.length > 5) {
          signup();
        } else {
          setErrorMessage(
            "Minimum password length is 5"
          );
        }
    };
    
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input type="text" value={full_name} onChange={(e) => setFullName(e.target.value)} name="" required />
                    <label>Full Name</label>
                </div>
                <div className="user-box">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="" required />
                    <label>Email</label>
                </div>
                <div className="user-box">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="" required />
                    <label>Password</label>
                </div>
                <div className="user-box">
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="" required />
                    <label>Confirm Password</label>
                </div>
                <ErrorMessage message={errorMessage} />
                <button variant="contained" type="submit">Register</button>
            </form>
            <button onClick={() => props.onFormSwitch('login')}>Already Have an Account? Log In Here.</button>
        </div>
    );
};

export default Register2;