import React, {useState} from 'react';

export const Register = (props) => {
    const {email, setEmail} = useState('');
    const {pass, setPass} = useState('');
    const {name, setName} = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);

    }
    return (
    <div className='auth-form-container'>
        <form onSubmit={handleSubmit}>
            <label htmlfor="email">email</label>
            <input value={email} type="email" placeholder="E-mail" id="email" name="email"></input>
            <label htmlfor="password">password</label>
            <input value={pass} type="password" placeholder="Password" id="password" name="password"></input>
            <button type="submit">Log In</button>
            <label htmlfor="name">Full Name</label>
            <input value={name} name="name" id="name" placeholder="Full Name" ></input>
            
        </form>
        <button onClick={() => props.onFormSwitch('login')}>Already Have an Account? Log In Here.</button>
    </div>
    )
}