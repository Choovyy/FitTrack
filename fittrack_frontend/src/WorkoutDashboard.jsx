import React, { useEffect, useState } from 'react';
import { getAllWorkouts, deleteWorkout } from './LogWorkoutService';
import { Link } from 'react-router-dom';
import './Style/WorkoutDashboard.css';

function WorkoutDashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workoutData = await getAllWorkouts();
        setWorkouts(workoutData);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDelete = async (workoutID) => {
    try {
      await deleteWorkout(workoutID);
      setWorkouts(workouts.filter(workout => workout.workoutID !== workoutID));
      alert('Workout deleted successfully!');
    } catch (error) {
      console.error('Error deleting workout:', error);
      alert('Failed to delete workout');
    }
  };

  return (
    <>
      <nav className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
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
      <div className="workout-dashboard">
        <h2>Workout Logs</h2>
        <div className="workout-list">
          {workouts.length === 0 ? (
            <p>No workouts found. Start logging your workouts!</p>
          ) : (
            workouts.map((workout) => (
              <div key={workout.workoutID} className="workout-card">
                <h3>{workout.exerciseType}</h3>
                <p><strong>Duration:</strong> {workout.duration} minutes</p>
                <p><strong>Calories Burned:</strong> {workout.caloriesBurned}</p>
                <p><strong>Date:</strong> {new Date(workout.workoutDate).toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}</p>
                <div className="workout-actions">
                  <Link to={`/update-workout/${workout.workoutID}`} className="update-btn">Update</Link>
                  <button onClick={() => handleDelete(workout.workoutID)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default WorkoutDashboard;
