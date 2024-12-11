import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createWorkoutGoal } from './WorkoutGoalService';
import './Style/WorkoutGoalForm.css';
import logo from './assets/FitTrack Logo.png';
import './App.css';
import { FaUser } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faFireAlt, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const WorkoutGoalForm = () => {
  const [goalDescription, setGoalDescription] = useState('');
  const [targetCalories, setTargetCalories] = useState('');
  const [targetDuration, setTargetDuration] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navigate = useNavigate();
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);

  // Handle goal description change
  const handleGoalDescriptionChange = (e) => {
    setGoalDescription(e.target.value);
    if (e.target.value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        goalDescription: 'Goal description is required.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        goalDescription: '',
      }));
    }
  };

  // Handle target calories change with real-time validation
  const handleTargetCaloriesChange = (e) => {
    let input = e.target.value;
    if (/[a-zA-Z]/.test(input)) {
      setErrors(prevErrors => ({ ...prevErrors, targetCalories: 'Target Calories cannot contain a letter' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, targetCalories: '' }));
      setTargetCalories(input);
    }
  };

 // Handle target duration change with real-time validation
 const handleTargetDurationChange = (e) => {
  let input = e.target.value;
  if (/[a-zA-Z]/.test(input)) {
    setErrors(prevErrors => ({ ...prevErrors, targetDuration: 'Target Duration cannot contain a letter' }));
  } else {
    setErrors(prevErrors => ({ ...prevErrors, targetDuration: '' }));
    setTargetDuration(input);
  }
};

  // Validate the form
  const validateForm = () => {
    const formErrors = {};
    if (!goalDescription) formErrors.goalDescription = 'Goal description is required';
    if (!targetCalories) formErrors.targetCalories = 'Target calories is required';
    if (!targetDuration) formErrors.targetDuration = 'Target duration is required';
    if (!deadline) formErrors.deadline = 'Deadline is required';
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before proceeding
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const userID = sessionStorage.getItem('userID');
    if (!userID) {
      alert('User is not authenticated. Please log in.');
      return;
    }

    const goalData = {
      goalDescription,
      targetCalories: parseInt(targetCalories, 10),
      targetDuration: parseInt(targetDuration, 10),
      deadline,
      user: { userID: parseInt(userID, 10) },
    };

    try {
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

  // Handle cancel button click
  const handleCancel = () => {
    navigate('/workout-goals');
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  // Toggle profile dropdown visibility
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
                <div className="form-group-goal">
                  <label htmlFor="goalDescription">
                    <FontAwesomeIcon icon={faClipboard} className="form-icon" /> Goal Description:
                  </label>
                  <textarea
                    id="goalDescription"
                    value={goalDescription}
                    onChange={handleGoalDescriptionChange}
                    rows="6"
                    maxLength="500"
                    placeholder="Describe your goal in detail..."
                    required
                  />
                  {errors.goalDescription && <p className="error-message-form">{errors.goalDescription}</p>}
                </div>
              </div>

              {/* Right Column */}
              <div className="right-column">
                <div className="form-group-calories">
                  <label htmlFor="targetCalories">
                    <FontAwesomeIcon icon={faFireAlt} className="form-icon" /> Target Calories:
                  </label>
                  <input
                    type="text"
                    id="targetCalories"
                    className="target-calories-input"
                    value={targetCalories}
                    onChange={handleTargetCaloriesChange}
                    placeholder="Enter target calories"
                    required
                    min="1"
                  />
                  {errors.targetCalories && <p className="error-message-form">{errors.targetCalories}</p>}
                  {errorMessage && <p className="error-message-form">{errorMessage}</p>}
                </div>

                <div className="form-group-duration">
                  <label htmlFor="targetDuration">
                    <FontAwesomeIcon icon={faClock} className="form-icon" /> Target Duration (minutes):
                  </label>
                  <input
                    type="text"
                    id="targetDuration"
                    className="target-duration-input"
                    value={targetDuration}
                    onChange={handleTargetDurationChange}
                    placeholder="Enter duration in minutes"
                    required
                  />
                  {errors.targetDuration && <p className="error-message-form">{errors.targetDuration}</p>}
                  {errorMessage && <p className="error-message-form">{errorMessage}</p>}
                </div>

                <div className="form-group-deadline">
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
                  {errors.deadline && <p className="error-message-form">{errors.deadline}</p>}
                </div>

                <div className="button-container">
                  <button type="submit" className="save-button-form">Save</button>
                  <button type="button" className="cancel-button-form" onClick={handleCancel}>Cancel</button>
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
