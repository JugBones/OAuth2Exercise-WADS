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
            <label htmlfor = "email">Email</label>
            {/* <output value = {email} type = "email" placeholder = "E-mail" id = "email" name = "email"></output> */}
            <label htmlfor = "password">Password</label>
            {/* <output value = {pass} type = "password" placeholder = "Password" id = "password" name = "password"></output> */}
            <label htmlfor = "name">Full Name</label>
            {/* <output value = {name} name = "name" id = "name" placeholder = "Full Name"></output> */}
            </form>
        <button onClick={() => props.onFormSwitch('back')}>Back</button>
    </div>
    )
}