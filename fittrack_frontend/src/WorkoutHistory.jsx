import React, { useEffect, useState } from 'react';
import { getAllWorkouts, deleteWorkout } from './LogWorkoutService';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Style/WorkoutHistory.css';
import './App.css';
import logo from "./assets/FitTrack Logo.png";

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workoutData = await getAllWorkouts();
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

  return (
    <>
<nav className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
  <div className="navbar-logo">
    <Link to="/dashboard">
      <img src={logo} alt="FitTrack Logo" />
    </Link>
  </div>
  <ul className="navList">
    {/* Navigation links */}
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

<div class="footer">
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
          </div>
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <div key={workout.workoutID} className="workout-item">
                <div>{workout.exerciseType}</div>
                <div>{workout.duration} minutes</div>
                <div>{workout.caloriesBurned} cal</div>
                <div>{new Date(workout.workoutDate).toLocaleDateString()}</div>
                <div className="workout-actions">
                  <button onClick={() => handleUpdate(workout.workoutID)} className="update-btn">Update</button>
                  <button onClick={() => handleDelete(workout.workoutID)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No workouts found. Start logging your workouts!</p>
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
