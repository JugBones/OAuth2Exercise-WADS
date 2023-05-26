import React, {useState, useContext} from 'react';

import { UserContext } from './context/UserContext';

export const Landing = (props) => {
    const [token, setToken] = useContext(UserContext);
    const handleLogout = (e) =>{
        setToken(null);
        props.onFormSwitch('Register');
    }

    return (
        <div>
        <h1 className="title">You Are Logged In!!</h1>
        {token && (
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    );
}

export default Landing;