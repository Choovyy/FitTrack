import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/FitTrack Logo.png';
import backgroundGif from './assets/muscle.gif'; // Import the GIF

const JoinUs = () => {
  const navigate = useNavigate(); 

  const handleJoinClick = () => {
    navigate('/register'); 
  };
  
  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <>

      <div className="app-container">
        <style>
          {`
            /* Apply background GIF to the whole page */
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              width: 100%;
              background: url(${backgroundGif}) no-repeat center center fixed;
              background-size: cover;
            }

            .app-container {
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              position: relative;
              z-index: 1; /* Ensure the content is on top of the background */
            }

            .logo {
              width: 250px;
              height: auto; /* Maintains aspect ratio */
            }

            .loginButton {
              position: fixed;
              top: 10px;
              right: 10px;
              padding: 10px 20px;
              font-size: 1rem;
              background-color: green;
              color: white;
              border: none;
              cursor: pointer;
              z-index: 2;
            }

            .joinButton {
              padding: 10px 20px;
              font-size: 1rem;
              background-color: green;
              color: white;
              border: none;
              cursor: pointer;
            }

            h1, p {
              color: white;
              z-index: 2;
            }
          `}
        </style>

        {/* Login button at the top-right */}
        <button className="loginButton" onClick={handleLoginClick}>
          LOGIN
        </button>

        {/* Logo and main content */}
        <img src={logo} alt="FitTrack Logo" className="logo" />
        <h1>Join Us</h1>
        <p>Become a part of our community!</p>
        <button className="joinButton" onClick={handleJoinClick}>
          Join Us
        </button>
      </div>
    </>
  );
};

export default JoinUs;
