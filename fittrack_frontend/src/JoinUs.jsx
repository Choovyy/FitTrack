import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/FitTrack Logo.png';
import fitnessVideo from './assets/fitness.mp4';
import './Style/JoinUs.css';

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
        {/* Video Background */}
        <video
          className="video-background"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={fitnessVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Centered Content */}
        <h1 className="headline">Track. Improve. Achieve.</h1>
        <p className="subtext">
          Stay on top of your fitness with personalized tracking and achieve your goal with us.
        </p>
        <button className="join-button" onClick={handleJoinClick}>
          Join Now
        </button>
      </div>

      {/* Logo Outside Left Side */}
      <img src={logo} alt="FitTrack Logo" className="logo" />

      {/* Login Button Outside Right Side */}
      <button className="login-buttons" onClick={handleLoginClick}>
        LOGIN
      </button>
    </>
  );
};

export default JoinUs;
