import React, { useState } from 'react';
import Register2 from './Register2';

export const Register = (props) => {
    const {email, setEmail} = useState('');
    const {pass, setPass} = useState('');
    const {name, setName} = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);

    }

    return (
    <div className = 'auth-form-container'>
        <form onSubmit = {handleSubmit}>
            <label htmlfor = "email">Email</label>
            <input value = {email} type = "email" placeholder = "E-mail" id = "email" name = "email"></input>
            <label htmlfor = "password">Password</label>
            <input value = {pass} type = "password" placeholder = "Password" id = "password" name = "password"></input>
            <label htmlfor = "name">Full Name</label>
            <input value = {name} name = "name" id = "name" placeholder = "Full Name"></input>
            <button type = "submit">Register</button>
            </form>
        <button onClick={() => props.onFormSwitch('login')}>Already Have an Account? Log In Here.</button>
    </div>
    )
}
