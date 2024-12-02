import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllWorkouts } from './LogWorkoutService';
import { FaDumbbell, FaBullseye, FaHistory, FaClipboardList, FaUser } from 'react-icons/fa';
import logo from './assets/FitTrack Logo.png';
import './Style/Dashboard.css';
import './App.css';

function Dashboard() {
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentWorkouts = async () => {
      try {
        const workouts = await getAllWorkouts();
        const recent = workouts
          .sort((a, b) => new Date(b.workoutDate) - new Date(a.workoutDate))
          .slice(0, 5);
        setRecentWorkouts(recent);
      } catch (error) {
        console.error('Error fetching recent workouts:', error);
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

      <div className="dashboard-page">
        <header className="dashboard-header">
          <h2>Welcome back!</h2>
        </header>

        <div className="dashboard-controls">
          <Link to="/post" className="btn">
            <FaClipboardList className="icon" /> View Posts
          </Link>
          <Link to="/workout-goals" className="btn">
            <FaBullseye className="icon" /> Add Goal
          </Link>
          <Link to="/log-workout" className="btn">
            <FaDumbbell className="icon" /> Log a Workout
          </Link>
          <Link to="/workout-history" className="btn">
            <FaHistory className="icon" /> View History
          </Link>
        </div>

        <div className="footer">
          © 2024 || <a href="#">FitTrack</a>
        </div>

        <div className="recent-workouts">
          <h3>Recent Workouts</h3>
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
