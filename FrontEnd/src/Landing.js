import React, { useContext } from 'react';
import { UserContext } from './context/UserContext';

export const Landing = (props) => {
  const [token, setToken] = useContext(UserContext);
  const handleLogout = () => {
    setToken(null);
    props.onFormSwitch('register');
  };

  const title = 'Welcome to the Landing Page';
  const username = token ? token.username : ''; // Assuming token contains the username

  return (
    <div>
      <h1 className="title">{title}</h1>
      {token ? (
        <div>
          <p>Welcome, {username}!</p>
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Please log in or register to access the landing page.</p>
      )}
    </div>
  );
};

export default Landing;
