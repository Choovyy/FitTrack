import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import logo from './assets/FitTrack Logo.png';

const JoinUs = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleJoinClick = () => {
    navigate('/login'); // Redirect to the Login page
  };

  return (
    <>
    <nav className="navbar">
        <ul className="navList">
          <li className="navDashboard">
            <Link to="/" className="navLink">Dashboard</Link>
          </li>
        </ul>
      </nav>
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
      <button className="joinButton" onClick={handleJoinClick}>
        Join Us
      </button>
    </div>
    </>
  );
};

export default JoinUs;
