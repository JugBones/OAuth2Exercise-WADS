import { useContext, useEffect, useState } from "react";
import Login2 from './Login2';

import { Register2 } from './Register2';
// import { Landing } from './Landing';
// import { Profile } from './Profile';
import './App.css';

import { UserContext } from "./context/UserContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";


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
        // currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register2 onFormSwitch={toggleForm}/>
        // currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Landing onFormSwitch={toggleForm}/>
        // <BrowserRouter>
        //   <Route>
        //       <Routes>
        //       <Route exact path = "/Login"      element = {<Login/>}    />
        //       <Route exact path = "/Register"   element = {<Register/>} />
        //       <Route exact path = "/Register2"  element = {<Register2/>} />
        //       <Route exact path = "/Landing"    element = {<Landing/>}  />
        //       <Route exact path = "/Profile"    element = {<Profile/>}  />
        //       </Routes>
        //     </Route>
        // </BrowserRouter>
      }
    </div>
  ); 
}

export default App;