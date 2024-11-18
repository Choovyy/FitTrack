import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/FitTrack Logo.png';
import backgroundGif from './assets/muscle.gif';

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
      <div className="join-us-container">
        <style>
          {`
            /* Full-page background styling */
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              width: 100%;
              background: url(${backgroundGif}) no-repeat center center fixed;
              background-size: cover;
            }

            .join-us-container {
              height: 100vh;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              position: relative;
            }

            .logo {
              position: absolute;
              top: 5px;
              left: 15px;
              padding-left: 20px;
              width: 100%;
              max-width: 170px;
              height: auto;
              max-height: 100px;
            }

            .login-button {
              position: absolute;
              top: 20px;
              right: 0;
              padding-right: 20px;
              padding: 10px 20px;
              font-size: 1rem;
              font-weight: bold;
              background-color: #e63946;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: transform 0.2s ease;
            }

            .login-button:hover {
              transform: scale(1.1);
              background-color: #d62828;
            }

            .headline {
              font-size: 3rem;
              font-weight: bold;
              color: white;
              margin-bottom: 10px;
              text-align: center;
            }

            .subtext {
              font-size: 1.5rem;
              color: white;
              margin-bottom: 20px;
              text-align: center;
            }

            .join-button {
              padding: 15px 30px;
              font-size: 1rem;
              font-weight: bold;
              color: white;
              background-color: #e63946;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: transform 0.2s ease;
            }

            .join-button:hover {
              transform: scale(1.1);
              background-color: #d62828;
            }
            .login-button{
              right: 20px;
              margin-top: 13px;
            }
          `}
        </style>
        
        {/* Centered Content */}
        <h1 className="headline">Track. Improve. Achieve.</h1>
<p className="subtext">
  Stay on top of your fitness with personalized tracking and real-time progress updates.
</p>
<button className="join-button" onClick={handleJoinClick}>
  Join Now
</button>

      </div>

      {/* Logo Outside Left Side */}
      <img src={logo} alt="FitTrack Logo" className="logo" />

      {/* Login Button Outside Right Side */}
      <button className="login-button" onClick={handleLoginClick} class ="login-button">
        LOGIN
      </button>
    </>
  );
};

export default JoinUs;
