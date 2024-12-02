// WorkoutGoalPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllWorkoutGoals, deleteWorkoutGoal } from './WorkoutGoalService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faBullseye, faFire, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './Style/WorkoutGoalPage.css';
import logo from "./assets/FitTrack Logo.png";
import goalImage from './assets/goalpic.jpg'; // Importing the image
import './App.css';
import { FaUser } from 'react-icons/fa';

const WorkoutGoalPage = () => {
  const [workoutGoals, setWorkoutGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);  // Modal visibility state
  const [goalToDelete, setGoalToDelete] = useState(null);  // Goal to delete
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);


  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await getAllWorkoutGoals();
        setWorkoutGoals(response);
      } catch (error) {
        setError('Error fetching workout goals');
        console.error('Error fetching workout goals:', error);
      }
    };

    fetchGoals();
  }, []);

  const handleDelete = async () => {
    if (goalToDelete) {
      try {
        setLoading(true);
        await deleteWorkoutGoal(goalToDelete.workoutID);
        setWorkoutGoals(workoutGoals.filter(goal => goal.workoutID !== goalToDelete.workoutID));
        setShowModal(false);  // Close the modal
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error deleting workout goal');
        console.error('Error deleting workout goal:', error);
      }
    }
  };
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };
  return (
    <div className="workout-goal-page">
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


      <div className="footer">
        © 2024 || <a href="#">FitTrack</a>
      </div>

      {/* New information section */}
      <div className="goal-info-section">
        <img src={goalImage} alt="Person lifting weights" className="goal-info-image" />
        <div className="goal-info-text">
          <h2>Achieve Your Fitness Goals</h2>
          <p>Stay motivated and on track! Push your limits and track your progress to see real results. Your fitness journey starts here!</p>
        </div>
      </div>

      <div className="goals-header">
        <h2 className="goals-title">Your Goals</h2>
        <Link to="/workout-goals/new" className="add-goal-button">
          <FontAwesomeIcon icon={faPlus} /> Add Goal
        </Link>
      </div>

      <div className="goals-container">
        {workoutGoals.map(goal => (
          <div key={goal.workoutID} className="goal-card">
            <div className="goal-details">
              <p className="goal-description">
                <FontAwesomeIcon icon={faBullseye} className="icon" /> Description: {goal.goalDescription}
              </p>
              <p className="goal-target-calories">
                <FontAwesomeIcon icon={faFire} className="icon" /> Target Calories: {goal.targetCalories} calories
              </p>
              <p className="goal-target-duration">
                <FontAwesomeIcon icon={faClock} className="icon" /> Target Duration: {goal.targetDuration} minutes
              </p>
              <p className="goal-deadline">
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" /> Deadline: {goal.deadline}
              </p>
            </div>
            <button 
              onClick={() => { 
                setGoalToDelete(goal); 
                setShowModal(true); 
              }} 
              className="delete-button">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this goal?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={handleDelete} className="modal-confirm-btn">
                {loading ? 'Deleting...' : 'Yes'}
              </button>
              <button onClick={() => setShowModal(false)} className="modal-cancel-btn">
                Cancel
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutGoalPage;
