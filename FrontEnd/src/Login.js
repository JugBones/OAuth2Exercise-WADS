import React, {useState} from 'react';

export const Login = (props) => {
    const {email, setEmail} = useState('');
    const {pass, setPass} = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);

    }
    return(
    <div className='auth-form-container'>
        <form onSubmit={handleSubmit}>
            <label htmlfor="email">email</label>
            <input value={email} type="email" placeholder="E-mail" id="email" name="email"></input>
            <label htmlfor="password">password</label>
            <input value={pass} type="password" placeholder="Password" id="password" name="password"></input>
            <button type="submit">Log In</button>
        </form>
        <button onClick={() => props.onFormSwitch('register')}>Don't Have an Account yet? Register Here</button>
    </div>

    )
}