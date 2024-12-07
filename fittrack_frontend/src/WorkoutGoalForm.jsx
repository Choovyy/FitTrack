import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createWorkoutGoal } from './WorkoutGoalService';
import './Style/WorkoutGoalForm.css';
import logo from "./assets/FitTrack Logo.png";
import './App.css';
import { FaUser } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faFireAlt, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const WorkoutGoalForm = () => {
  const [goalDescription, setGoalDescription] = useState('');
  const [targetCalories, setTargetCalories] = useState('');
  const [targetDuration, setTargetDuration] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate the form data
  const validateForm = () => {
    const errors = {};
    if (!goalDescription.trim()) {
      errors.goalDescription = 'Goal description is required.';
    }
    if (!targetCalories || targetCalories <= 0) {
      errors.targetCalories = 'Target calories must be a positive number.';
    }
    if (!targetDuration || targetDuration <= 0) {
      errors.targetDuration = 'Target duration must be a positive number.';
    }
    if (!deadline || isNaN(Date.parse(deadline))) {
      errors.deadline = 'Deadline must be a valid date.';
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form before proceeding
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop form submission if there are errors
    }
  
    // Get the user ID from localStorage
    const userID = sessionStorage.getItem('userID');
    if (!userID) {
      alert('User is not authenticated. Please log in.');
      return;
    }
  
    // Prepare the goal data object
    const goalData = {
      goalDescription,
      targetCalories: parseInt(targetCalories, 10),
      targetDuration: parseInt(targetDuration, 10),
      deadline,
      user: { userID: parseInt(userID, 10) },  // Ensure userID is included correctly
    };
  
    try {
      // Log the goal data to check if userID is correct before sending
      console.log('Submitting goal data:', goalData);
  
      await createWorkoutGoal(goalData);
      setGoalDescription('');
      setTargetCalories('');
      setTargetDuration('');
      setDeadline('');
      setErrors({});
      alert('Workout Goal created successfully!');
      navigate('/workout-goals');
    } catch (error) {
      console.error('Error creating workout goal:', error);
      alert('Failed to create workout goal.');
    }
  };
  
  

  const handleCancel = () => {
    navigate('/workout-goals');
  };
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

      
      <div className="footer">
            © 2024 || <a href="#">FitTrack</a>
            </div>
      <div className="workout-goal-form-page">
        <div className="workout-goal-form-container">
          <h2 className="form-heading">Set Your Goals</h2>

          <form onSubmit={handleSubmit} className="workout-goal-form">
            <div className="form-content">
              {/* Left Column */}
              <div className="left-column">
                <div className="form-group">
                  <label htmlFor="goalDescription">
                    <FontAwesomeIcon icon={faClipboard} className="form-icon" /> Goal Description:
                  </label>
                  <textarea
                    id="goalDescription"
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                    rows="6"
                    maxLength="500"
                    placeholder="Describe your goal in detail..."
                    required
                  />
                  {errors.goalDescription && <p className="error-message">{errors.goalDescription}</p>}
                </div>
              </div>

              {/* Right Column */}
              <div className="right-column">
                <div className="form-group">
                  <label htmlFor="targetCalories">
                    <FontAwesomeIcon icon={faFireAlt} className="form-icon" /> Target Calories:
                  </label>
                  <input
                    type="number"
                    id="targetCalories"
                    value={targetCalories}
                    onChange={(e) => setTargetCalories(e.target.value)}
                    placeholder="Enter target calories"
                    required
                    min='1'
                  />
                  {errors.targetCalories && <p className="error-message">{errors.targetCalories}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="targetDuration">
                    <FontAwesomeIcon icon={faClock} className="form-icon" /> Target Duration (minutes):
                  </label>
                  <input
                    type="number"
                    id="targetDuration"
                    value={targetDuration}
                    onChange={(e) => setTargetDuration(e.target.value)}
                    placeholder="Enter duration in minutes"
                    required
                  />
                  {errors.targetDuration && <p className="error-message">{errors.targetDuration}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="deadline">
                    <FontAwesomeIcon icon={faCalendarAlt} className="form-icon" /> Deadline:
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
                  {errors.deadline && <p className="error-message">{errors.deadline}</p>}
                </div>

                <div className="button-container">
                  <button type="submit" className="save-button-form">SAVE</button>
                  <button type="button" className="cancel-button-form" onClick={handleCancel}>CANCEL</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WorkoutGoalForm;
