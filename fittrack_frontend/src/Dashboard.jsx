import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllWorkouts } from './LogWorkoutService';
import './Style/Dashboard.css';

function Dashboard() {
  const [recentWorkouts, setRecentWorkouts] = useState([]);

  // Fetch recent workouts on component load and after a new workout is logged
  useEffect(() => {
    const fetchRecentWorkouts = async () => {
      try {
        const workouts = await getAllWorkouts();
        // Sort by date and get the latest 2 workouts
        const recent = workouts
          .sort((a, b) => new Date(b.workoutDate) - new Date(a.workoutDate))
          .slice(0, 2);
        setRecentWorkouts(recent);
      } catch (error) {
        console.error("Error fetching recent workouts:", error);
      }
    };

    fetchRecentWorkouts();
  }, [recentWorkouts]); // Update when recent workouts change

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

      <div className="dashboard-page">
        <header className="dashboard-header">
          <h2>Dashboard</h2>
        </header>

        <div className="dashboard-controls">
          <Link to="/log-workout" className="btn">Log Workout</Link>
          <Link to="/workout-goals" className="btn">Set Goals</Link>
          <Link to="/workout-dashboard" className="btn">View History</Link>
        </div>

        <div className="dashboard-content">
          <div className="recent-workouts">
            <h3>Recent Workouts</h3>
            {recentWorkouts.length > 0 ? (
              recentWorkouts.map((workout) => (
                <p key={workout.workoutID}>
                  {workout.exerciseType} - {workout.duration} mins - {workout.caloriesBurned} cal
                </p>
              ))
            ) : (
              <p>No recent workouts found.</p>
            )}
          </div>

          <div className="analytics-section">
            <h3>Analytics</h3>
            <p>[Analytics will be displayed here]</p>
          </div>
        </div>
        <Link to="/post" className="view-past-link">View Post</Link>
      </div>
    </>
  );
}

export default Dashboard;
