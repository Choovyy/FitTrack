import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllWorkouts } from './LogWorkoutService';
import './Style/Dashboard.css';
import './App.css';

function Dashboard() {
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const fetchRecentWorkouts = async () => {
      try {
        const workouts = await getAllWorkouts();
        const recent = workouts
          .sort((a, b) => new Date(b.workoutDate) - new Date(a.workoutDate))
          .slice(0, 5);
        setRecentWorkouts(recent);
      } catch (error) {
        console.error("Error fetching recent workouts:", error);
      }
    };

    fetchRecentWorkouts();

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

      <div className="dashboard-page">
        <header className="dashboard-header">
          <h2>Welcome John,</h2>
        </header>

        <div className="dashboard-controls">
          <Link to="/log-workout" className="btn">Log a workout</Link>
          <Link to="/workout-goals" className="btn">Add goal</Link>
          <Link to="/post" className="btn">View Posts</Link>
          <Link to="/workout-history" className="btn">View History</Link>
        </div>

        <div className="did-you-know">
          <h3>Did you know?</h3>
          <p>"Fitness isn’t about being better than someone else. It’s about being better than you used to be."</p>
        </div>

        <div className="recent-workouts">
          <h3>Recent Workout</h3>
          <div className="workout-labels">
            <span>Exercise Type</span>
            <span>Duration</span>
            <span>Calories Burned</span>
          </div>
          {recentWorkouts.length > 0 ? (
            recentWorkouts.map((workout) => (
              <div className="workout-item" key={workout.workoutID}>
                <div>{workout.exerciseType}</div>
                <div>{workout.duration} minutes</div>
                <div>{workout.caloriesBurned} cal</div>
              </div>
            ))
          ) : (
            <p>No recent workouts found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
