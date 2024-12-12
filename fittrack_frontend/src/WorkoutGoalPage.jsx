import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllWorkoutGoals, deleteWorkoutGoal } from './WorkoutGoalService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faBullseye, faFire, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './Style/WorkoutGoalPage.css';
import logo from "./assets/FitTrack Logo.png";
import goalImage from './assets/goalpic.jpg';
import { FaUser } from 'react-icons/fa';

const WorkoutGoalPage = () => {
  const [workoutGoals, setWorkoutGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const userID = sessionStorage.getItem('userID');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await getAllWorkoutGoals(userID);
        setWorkoutGoals(response);
      } catch (error) {
        setError('Error fetching workout goals');
        console.error('Error fetching workout goals:', error);
      }
    };

    fetchGoals();
  }, [userID]);

  const handleDelete = async () => {
    if (goalToDelete) {
      try {
        setLoading(true);
        await deleteWorkoutGoal(goalToDelete.workoutID);
        setWorkoutGoals(workoutGoals.filter(goal => goal.workoutID !== goalToDelete.workoutID));
        setShowModal(false);
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
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/dashboard">
            <img src={logo} alt="FitTrack Logo" />
          </Link>
        </div>
        <ul className="navList">
          <li><Link to="/dashboard" className="navLink">Dashboard</Link></li>
          <li><Link to="/workout-history" className="navLink">History</Link></li>
          <li><Link to="/aboutus" className="navLink">About Us</Link></li>
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
      <div className="goals-container">
        <div className="goals-header">
          <h2 className="goals-title">Your Goals</h2>
          <Link to="/workout-goals/new" className="add-goal-button">
            <FontAwesomeIcon icon={faPlus} /> Add Goal
          </Link>
        </div>
        {workoutGoals.length > 0 ? (
          workoutGoals.map(goal => (
            <div key={goal.workoutID} className="goal-card">
              <div className="goal-details">
                <p><FontAwesomeIcon icon={faBullseye} /> Description: {goal.goalDescription}</p>
                <p><FontAwesomeIcon icon={faFire} /> Target Calories: {goal.targetCalories}</p>
                <p><FontAwesomeIcon icon={faClock} /> Target Duration: {goal.targetDuration} mins</p>
                <p style = {{color: 'red' }}><FontAwesomeIcon icon={faCalendarAlt} /> Deadline: {goal.deadline}</p>
              </div>
              <button onClick={() => { setGoalToDelete(goal); setShowModal(true); }} className="delete-button">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          ))
        ) : (
          <p className="no-goals">No goals added yet.</p>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this goal?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={handleDelete} className="modal-confirm-btn">
                {loading ? 'Deleting...' : 'Yes'}
              </button>
              <button onClick={() => setShowModal(false)} className="modal-cancel-btn">Cancel</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}

      <div className="footer">
        © 2024 || <a href="#">FitTrack</a>
      </div>
    </div>
  );
};

export default WorkoutGoalPage;
