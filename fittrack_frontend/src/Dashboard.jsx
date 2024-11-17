import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllWorkouts } from './LogWorkoutService';
import { FaDumbbell, FaBullseye, FaHistory, FaClipboardList } from 'react-icons/fa';
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
          <li className="navHistory">
            <Link to="/workout-history" className="navLink">History</Link>
          </li>
          <li className="navAboutUs">
            <Link to="/aboutus" className="navLink">About Us</Link>
          </li>
        </ul>
      </nav>

      <div className="dashboard-page">
        <header className="dashboard-header">
          <h2>Welcome back!</h2>
        </header>

        <div className="dashboard-controls">
          <Link to="/post" className="btn">
            <FaClipboardList className="icon" /> View Posts
          </Link>
          <Link to="/workout-goals" className="btn">
            <FaBullseye className="icon" /> Add goal
          </Link>
          <Link to="/log-workout" className="btn">
            <FaDumbbell className="icon" /> Log a workout
          </Link>
          <Link to="/workout-history" className="btn">
            <FaHistory className="icon" /> View History
          </Link>
        </div>

        <div className="recent-workouts">
          <h3>Recent Workout</h3>
          <div className="workout-labels">
            <span>Exercise Type</span>
            <span>Duration (minutes)</span>
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
