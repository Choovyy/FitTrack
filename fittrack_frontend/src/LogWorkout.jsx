import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import './Style/Workout.css';
import { createWorkout } from './LogWorkoutService';

const LogWorkout = () => {
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent form submission to handle validation

    // Check if all fields are filled out
    if (!exerciseType || !duration || !caloriesBurned) {
      alert('Please fill out all fields!');
      return;
    }

    try {
      const workoutData = {
        exerciseType,
        duration: parseInt(duration, 10),
        caloriesBurned: parseInt(caloriesBurned, 10),
      };
      await createWorkout(workoutData);
      alert('Workout saved!');
      navigate('/workout-dashboard');
    } catch (error) {
      console.error('Full error details:', error.response ? error.response.data : error.message);
      alert('Failed to save workout. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <>
      <nav className="navbar">
        <ul className="navList">
          <li className="navDashboard">
            <Link to="/home" className="navLink">Dashboard</Link>
          </li>
          <li className="navLogworkout">
            <Link to="/log-workout" className="navLink">Log Workout</Link>
          </li>
          <li className="navWorkoutGoal">
            <Link to="/workout-goals" className="navLink">Workout Goal</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <h2>Log Your Workout</h2>
        <form onSubmit={handleSave}>
          <div className="formGroup">
            <label>Exercise Type:</label>
            <input 
              type="text" 
              className="textBox" 
              value={exerciseType} 
              onChange={(e) => setExerciseType(e.target.value)} 
              required // This ensures the field is required
            />
          </div>
          <div className="formGroup">
            <label>Duration (minutes):</label>
            <input 
              type="number" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)} 
              required // This ensures the field is required
            />
          </div>
          <div className="formGroup">
            <label>Calories Burned:</label>
            <input 
              type="number" 
              value={caloriesBurned} 
              onChange={(e) => setCaloriesBurned(e.target.value)} 
              required // This ensures the field is required
            />
          </div>
          <button type="submit" className="saveButton">Save</button>
        <button onClick={handleCancel} className="cancelButton">Cancel</button>
        </form>
      </div>
    </>
  );
};

export default LogWorkout;
