import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutById, updateWorkout } from './LogWorkoutService';
import { Link } from 'react-router-dom';
import './Style/UpdateWorkout.css';
import logo from './assets/FitTrack Logo.png';
import './App.css';
import { FaUser } from 'react-icons/fa';

const UpdateWorkout = () => {
  const { workoutID } = useParams();
  const navigate = useNavigate();

  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // Add this line to declare the state
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false); // Define the missing state

  useEffect(() => {
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

  const handleExerciseTypeChange = (e) => {
    let input = e.target.value.replace(/[0-9]/g, ''); // Remove any numeric characters
    input = input.toLowerCase();
    input = input.charAt(0).toUpperCase() + input.slice(1); // Capitalize the first letter
    setExerciseType(input);
  };

  const handleDurationChange = (e) => {
    let input = e.target.value;
    if (input < 1) input = ''; // Clear invalid input
    setDuration(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === '-') {
      e.preventDefault();
    }
  };

  const handleCaloriesBurnedChange = (e) => {
    let input = e.target.value;
    if (input < 1) input = ''; // Clear invalid input
    setCaloriesBurned(input);
  };

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
    navigate('/workout-history');
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

      <div className="update-workout-container">
        <h2>Update Workout</h2>
        <form onSubmit={handleUpdate}>
          <div className="formGroup">
            <label>Exercise Type:</label>
            <input
              type="text"
              value={exerciseType}
              onChange={handleExerciseTypeChange}
              onKeyDown={handleKeyDown}
              required
            />
          </div>
          <div className="formGroup">
            <label>Duration (minutes):</label>
            <input
              type="number"
              value={duration}
              onChange={handleDurationChange}
              onKeyDown={handleKeyDown}
              required
            />
          </div>
          <div className="formGroup">
            <label>Calories Burned:</label>
            <input
              type="number"
              value={caloriesBurned}
              onChange={handleCaloriesBurnedChange}
              onKeyDown={handleKeyDown}
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
