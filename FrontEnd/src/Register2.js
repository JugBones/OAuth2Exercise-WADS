import React, {useState} from 'react';
import { UserContext } from './context/UserContext';

export const Register2 = (props) => {
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');
    const {name, setName} = useState('');
    const [setToken] = UserContext(UserContext);
    const [errorMessage, setErrorMessage] = useState('');

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email: email, hashed_password: password}),

        };

        const response = await fetch("/api/users", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitRegistration();
    };

    return (
        <div className = 'auth-form-container'>
        <form onSubmit = {handleSubmit}>
            <label htmlfor = "email">email</label>
            <input value = {email} type = "email" placeholder = "E-mail" id = "email" name = "email"></input>
            <label htmlfor = "password">password</label>
            <input value = {password} type = "password" placeholder = "Password" id = "password" name = "password"></input>
            <button type = "submit">Log In</button>
            <label htmlfor = "name">Full Name</label>
            <input value = {name} name = "name" id = "name" placeholder = "Full Name"></input>
        </form>
        <button onClick={() => props.onFormSwitch('login')}>Already Have an Account? Log In Here.</button>
    </div>
    )
};

export default Register2;