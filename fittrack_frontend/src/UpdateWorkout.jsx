// UpdateWorkout.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutById, updateWorkout } from './LogWorkoutService';
import { Link } from 'react-router-dom';
import './Style/UpdateWorkout.css';

const UpdateWorkout = () => {
  const { workoutID } = useParams();
  const navigate = useNavigate();

  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');

  useEffect(() => {
    // Fetch the workout data by ID
    const fetchWorkout = async () => {
      try {
        const workout = await getWorkoutById(workoutID);
        setExerciseType(workout.exerciseType);
        setDuration(workout.duration);
        setCaloriesBurned(workout.caloriesBurned);
      } catch (error) {
        console.error('Error fetching workout:', error);
      }
    };

    fetchWorkout();
  }, [workoutID]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedWorkout = {
        exerciseType,
        duration: parseInt(duration, 10),
        caloriesBurned: parseInt(caloriesBurned, 10),
      };
      await updateWorkout(workoutID, updatedWorkout);
      alert('Workout updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating workout:', error);
      alert('Failed to update workout. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
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
          <li className="navWorkoutGoal">
            <Link to="/workout-goals" className="navLink">Workout Goal</Link>
          </li>
        </ul>
      </nav>
    <div className="update-workout-container">
      <h2>Update Workout</h2>
      <form onSubmit={handleUpdate}>
        <div className="formGroup">
          <label>Exercise Type:</label>
          <input
            type="text"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            required
          />
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
        <button type="submit" className="saveButton">Update</button>
        <button onClick={handleCancel} className="cancelButton">Cancel</button>
      </form>
    </div>
    </>
  );
};

export default UpdateWorkout;
