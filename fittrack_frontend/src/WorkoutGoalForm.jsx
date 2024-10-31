import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import { createWorkoutGoal } from './WorkoutGoalService'; // Importing the function directly
import './Style/WorkoutGoalForm.css'; // Importing a CSS file for styles
import './App.css';

const WorkoutGoalForm = () => {
  const [goalDescription, setGoalDescription] = useState('');
  const [targetCalories, setTargetCalories] = useState('');
  const [targetDuration, setTargetDuration] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goalData = {
      goalDescription,
      targetCalories: parseInt(targetCalories, 10),
      targetDuration: parseInt(targetDuration, 10),
      deadline,
    };
  
    console.log("Submitting goal data:", goalData); // Log the goal data
  
    try {
      await createWorkoutGoal(goalData); // Call the imported function
      // Clear form after submission
      setGoalDescription('');
      setTargetCalories('');
      setTargetDuration('');
      setDeadline('');
      alert('Workout Goal created successfully!');
    } catch (error) {
      console.error('Error creating workout goal:', error);
    }
  };
  

  const handleCancel = () => {
    navigate('/workout-goals'); // Redirect to the list of workout goals on cancel
  };

  return (
    <>
      <nav className="navbar">
        <ul className="navList">
          <li className="navDashboard">
            <Link to="/dashboard" className="navLink">Dashboard</Link>
          </li>
          <li className="navLogworkout">
            <Link to="/log-workout" className="navLink">Log Workout</Link>
          </li>
        </ul>
      </nav>
      <div className="workout-goal-form-container">
        <h2>Set Your Goals</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="goalDescription">Goal Description:</label>
            <textarea
              id="goalDescription"
              value={goalDescription}
              onChange={(e) => setGoalDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="targetCalories">Target Calories:</label>
            <input
              type="number"
              id="targetCalories"
              value={targetCalories}
              onChange={(e) => setTargetCalories(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="targetDuration">Target Duration (minutes):</label>
            <input
              type="number"
              id="targetDuration"
              value={targetDuration}
              onChange={(e) => setTargetDuration(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="button-container">
            <button type="submit" className="save-button">SAVE</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>CANCEL</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WorkoutGoalForm;
