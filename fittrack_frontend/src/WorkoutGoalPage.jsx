import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllWorkoutGoals, deleteWorkoutGoal } from './WorkoutGoalService';
import './Style/WorkoutGoalPage.css';
import './App.css';

const WorkoutGoalPage = () => {
  const [workoutGoals, setWorkoutGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await getAllWorkoutGoals();
        setWorkoutGoals(response);
      } catch (error) {
        console.error('Error fetching workout goals:', error);
      }
    };

    fetchGoals();
  }, []);

  const handleDelete = async (goalId) => {
    try {
      await deleteWorkoutGoal(goalId);
      setWorkoutGoals(workoutGoals.filter(goal => goal.workoutID !== goalId));
    } catch (error) {
      console.error('Error deleting workout goal:', error);
    }
  };

  return (
    <div className="workout-goal-page">
      <nav className="navbar">
  <ul className="navList">
    <li className="navDashboard">
      <Link to="/dashboard" className="navLink">Dashboard</Link>
    </li>
    <li className="navLogWorkout">
      <Link to="/log-workout" className="navLink">Log Workout</Link>
    </li>
  </ul>
  <img src="/src/assets/FitTrack Logo.png" alt="FitTrack Logo" className="navbar-logo" />
</nav>

      <div className="goals-header">
        <h2 className="goals-title">Your Goals</h2>
        <Link to="/workout-goals/new" className="add-goal-button">Add Goal</Link>
      </div>
      <div className="goals-container">
        {workoutGoals.map(goal => (
          <div key={goal.workoutID} className="goal-card">
            <div className="goal-details">
              <p className="goal-description">Description: {goal.goalDescription}</p>
              <p className="goal-target-calories">Target Calories: {goal.targetCalories} calories</p>
              <p className="goal-target-duration">Target Duration: {goal.targetDuration} minutes</p>
              <p className="goal-deadline">Deadline: {goal.deadline}</p>
            </div>
            <button onClick={() => handleDelete(goal.workoutID)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutGoalPage;
