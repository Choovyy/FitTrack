import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/FitTrack Logo.png';
import backgroundGif from './assets/fitrack.gif'; // Import the GIF

const JoinUs = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleJoinClick = () => {
    navigate('/register'); 
  };

  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the Login page
  };

  return (
    <div className="app-container">
      {/* Add inline styles for the logo and login button */}
      <style>
        {`
          /* Apply background GIF to the whole page */
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            background: url(${backgroundGif}) no-repeat center center fixed;
            background-size: cover; /* Ensures the GIF covers the entire page */
          }

          .app-container {
            height: 100vh; /* Full viewport height */
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;
            z-index: 1; /* Ensure the content is on top of the background */
          }

          .logo {
            width: 250px; /* Adjust width as needed */
            height: auto; /* Maintains aspect ratio */
          }

          .loginButton {
            position: fixed;
            top: 10px; /* 10px from the top */
            right: 10px; /* 10px from the right edge */
            padding: 10px 20px;
            font-size: 1rem;
            background-color: green;
            color: white;
            border: none;
            cursor: pointer;
            z-index: 2; /* Keep login button above other elements */
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
            color: white; /* Adjust text color for better visibility */
            z-index: 2; /* Ensure text is above background */
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
  );
};

export default JoinUs;
