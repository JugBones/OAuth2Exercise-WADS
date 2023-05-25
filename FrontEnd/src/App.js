import React, { useContext, useEffect, useState } from "react";
import Login2 from './Login2';
import { Register2 } from './Register2';
import './App.css';
import { UserContext } from "./context/UserContext";

function App(){
  const [currentForm, setCurrentForm] = useState('login');
  const [token, setToken] = useContext(UserContext);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const [message, setMessage] = useState("");

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("http://localhost:8000/api", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login2 onFormSwitch={toggleForm}/> : <Register2 onFormSwitch={toggleForm}/>
      }
    </div>
  ); 
}

export default App;