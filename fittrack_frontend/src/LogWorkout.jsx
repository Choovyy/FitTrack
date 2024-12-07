import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import './Style/Workout.css';
import logo from "./assets/FitTrack Logo.png";
import logImage from './assets/logimage.jpg';
import { createWorkout } from './LogWorkoutService';
import { FaUser } from 'react-icons/fa';

const LogWorkout = () => {
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);  // Add this line to declare the state
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Retrieve userID from sessionStorage
  const userID = sessionStorage.getItem('userID');

  const handleExerciseTypeChange = (e) => {
    let input = e.target.value;
    if (/\d/.test(input)) {
      setErrorMessage('Exercise type cannot contain numbers');
    } else {
      setErrorMessage('');
      input = input.charAt(0).toUpperCase() + input.slice(1);
      setExerciseType(input);
    }
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (!exerciseType || !duration || !caloriesBurned) {
      alert('Please fill out all fields!');
      return;
    }
    if (!userID) {
      alert('User not authenticated. Please log in again.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      const workoutData = {
        exerciseType,
        duration: parseInt(duration, 10),
        caloriesBurned: parseInt(caloriesBurned, 10),
        user: { userID },  // Include userID with the request
      };
      await createWorkout(workoutData);

      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);

      setIsModalOpen(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Full error details:', error.response ? error.response.data : error.message);
      alert('Failed to save workout. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };

  return (
    <>
      <nav className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
        <div className="navbar-logo">
          <Link to="/dashboard">
            <img src={logo} alt="FitTrack Logo" />
          </Link>
        </div>
        <ul className="navList">
          <li>
            <Link to="/dashboard" className="navLink">Dashboard</Link>
          </li>
          <li>
            <Link to="/workout-history" className="navLink">History</Link>
          </li>
          <li>
            <Link to="/aboutus" className="navLink">About Us</Link>
          </li>
          <li className="navProfile">
            <button className="profile-btn navLink" onClick={toggleProfileDropdown}>
              <FaUser className="profile-icon" /> Profile
            </button>
            {isProfileDropdownVisible && (
              <div className="profile-dropdown">
                <button className="dropdown-item" onClick={() => navigate('/edit-profile')}>
                  Edit Profile
                </button>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>

      <div className="container">
        <div className="imageContainer">
          <img src={logImage} alt="Workout" className="workoutImage" />
        </div>

        <div className="formContainer">
          <h2>Log Your Workout</h2>
          <form onSubmit={handleSaveClick}>
            <div className="formGroup">
              <label>Exercise Type:</label>
              <input 
                type="text" 
                className="textBox" 
                value={exerciseType} 
                onChange={handleExerciseTypeChange} 
                required
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="formGroup">
              <label>Duration (minutes):</label>
              <input 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
                required
              />
            </div>
            <div className="formGroup">
              <label>Calories Burned:</label>
              <input 
                type="number" 
                value={caloriesBurned} 
                onChange={(e) => setCaloriesBurned(e.target.value)} 
                required
              />
            </div>
            <button type="submit" className="saveButton">Save</button>
            <button type="button" onClick={handleCancel} className="cancelButton">Cancel</button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Do you want to save this workout?</h3>
            <p>This action will save your workout data.</p>
            <div className="modalButtons">
              <button onClick={handleConfirmSave} className="saveButton">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="cancelButton">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="success-message">
          Workout saved!
        </div>
      )}
      <div className="footer">
        © 2024 || <a href="#">FitTrack</a>
      </div>
    </>
  );
};

export default LogWorkout;
