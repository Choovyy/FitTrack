import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/FitTrack Logo.png'; // Adjust the import path according to your file structure

const JoinUs = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleJoinClick = () => {
    navigate('/login'); // Redirect to the Login page
  };

  return (
    <div className="app-container">
      <style>
        {`
          .logo {
            width: 250px; /* Adjust width as needed */
            height: auto; /* Maintains aspect ratio */
          }
        `}
      </style>
      <img src={logo} alt="FitTrack Logo" className="logo" />
      <h1>Join Us</h1>
      <p>Become a part of our community!</p>
      <button className="saveButton" onClick={handleJoinClick}>
        Join Us
      </button>
    </div>
  );
};

export default JoinUs;
