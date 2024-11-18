import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import './Style/Workout.css';
import logo from "./assets/FitTrack Logo.png";
import logImage from './assets/logimage.jpg';
import { createWorkout } from './LogWorkoutService';

const LogWorkout = () => {
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleExerciseTypeChange = (e) => {
    let input = e.target.value;
    if (/\d/.test(input)) { // Check if input contains any digit
      setErrorMessage('Exercise type cannot contain numbers');
    } else {
      setErrorMessage('');
      // Capitalize the first letter of the input
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
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      const workoutData = {
        exerciseType,
        duration: parseInt(duration, 10),
        caloriesBurned: parseInt(caloriesBurned, 10),
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

  return (
    <>
      <nav className="navbar">
      <div className="navbar-logo">
    <img src={logo} alt="FitTrack Logo" />
  </div>
        <ul className="navList">
          <li className="navDashboard">
            <Link to="/dashboard" className="navLink">Dashboard</Link>
          </li>
          <li className="navHistory">
            <Link to="/workout-history" className="navLink">History</Link>
          </li>
          <li className="navAboutUs">
            <Link to="/aboutus" className="navLink">About Us</Link>
          </li>
        </ul>
      </nav>
      <div class="footer">
            © 2024 || <a href="#">FitTrack</a>
            </div>
      <div className="container">
        {/* Image on the left side */}
        <div className="imageContainer">
          <img src={logImage} alt="Workout" className="workoutImage" />
        </div>

        {/* Form to log workout */}
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
            <button onClick={handleCancel} className="cancelButton">Cancel</button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
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

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          Workout saved!
        </div>
      )}
    </>
  );
};

export default LogWorkout;
