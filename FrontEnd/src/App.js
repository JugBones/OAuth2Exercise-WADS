import React, { useState, /*useEffect*/ } from 'react';
import Login from './Login';
import { Register2 } from './Register2';
import './App.css';

function App(){
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register2 onFormSwitch={toggleForm}/>
      }
    </div>
  ); 
}

export default App;