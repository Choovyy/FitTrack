import React, { useEffect, useState } from 'react';
import { getAllWorkouts, deleteWorkout } from './LogWorkoutService';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Style/WorkoutHistory.css';
import './App.css';
import logo from "./assets/FitTrack Logo.png";
import { FaUser } from 'react-icons/fa';


function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const userID = sessionStorage.getItem('userID');  
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workoutData = await getAllWorkouts(userID); // Pass userID to the function
        const sortedWorkouts = workoutData.sort(
          (a, b) => new Date(b.workoutDate) - new Date(a.workoutDate)
        );
        setWorkouts(sortedWorkouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();

    const handleScroll = () => {
      setIsNavbarVisible(window.scrollY <= 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredWorkouts = workouts.filter((workout) =>
    workout.exerciseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (workoutID) => {
    setWorkoutToDelete(workoutID);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteWorkout(workoutToDelete);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout.workoutID !== workoutToDelete)
      );
      setIsModalOpen(false);
      navigate('/workout-history');
    } catch (error) {
      console.error('Error deleting workout:', error);
      alert('Failed to delete workout');
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setWorkoutToDelete(null);
  };

  const handleUpdate = (workoutID) => {
    navigate(`/update-workout/${workoutID}`);
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
      <div className="workout-history-page">
        <h2>Workout History</h2>

        {/* Search Bar with Material-UI */}
        <div className="search-bar">
          <TextField
            variant="outlined"
            placeholder="Search workout"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '100%',
              maxWidth: '400px',
              marginBottom: '20px',
            }}
          />
        </div>

        <div className="workout-history-container">
          <div className="workout-labels">
            <span>Exercise Type</span>
            <span>Duration (minutes)</span>
            <span>Calories Burned</span>
            <span>Date</span>
            <span>Actions</span>
          </div>
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <div key={workout.workoutID} className="logworkout-item">
                <div>{workout.exerciseType}</div>
                <div>{workout.duration} minutes</div>
                <div>{workout.caloriesBurned} cal</div>
                <div>{new Date(workout.workoutDate).toLocaleDateString()}</div>
                <div className="logworkout-actions">
                  <button onClick={() => handleUpdate(workout.workoutID)} className="logworkout-update-btn">Update</button>
                  <button onClick={() => handleDelete(workout.workoutID)} className="logworkout-delete-btn">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className = "no-history">
            <div>No workouts found. Start logging your workouts!</div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Are you sure you want to delete this workout?</h3>
            <p>This action cannot be undone.</p>
            <div className="modalButtons">
              <button onClick={confirmDelete} className="saveButton">Yes</button>
              <button onClick={handleCancelDelete} className="cancelButton">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WorkoutHistory;
