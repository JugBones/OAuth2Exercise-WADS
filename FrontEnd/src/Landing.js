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
    <div className = 'auth-form-container'>
        <form onSubmit = {handleSubmit}>
            <label htmlfor = "welcome">WELCOME</label>
            <label htmlfor = "congrats">Congratulations you have managed to login or register to this website!</label>
            <label htmlfor = "view">To view your full profile, click the button below</label>
            <button type = "submit">Profile</button>
            </form>
        <button onClick={() => props.onFormSwitch('login')}>Already Have an Account? Log In Here.</button>
    </div>
    )
}