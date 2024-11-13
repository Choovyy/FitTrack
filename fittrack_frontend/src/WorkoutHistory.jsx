import React, { useEffect, useState } from 'react';
import { getAllWorkouts, deleteWorkout } from './LogWorkoutService';
import { Link, useNavigate } from 'react-router-dom';
import './Style/WorkoutHistory.css';

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const navigate = useNavigate(); // For navigating after delete

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
      navigate('/workout-history'); // Redirect after delete
    } catch (error) {
      console.error('Error deleting workout:', error);
      alert('Failed to delete workout');
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setWorkoutToDelete(null);
  };

  // Update workout function
  const handleUpdate = (workoutID) => {
    // Navigate to the update page (replace '/update-workout' with your actual route)
    navigate(`/update-workout/${workoutID}`);
  };

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

      <div className="workout-dashboard">
        <h2>Workout Logs</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by exercise type"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="workoutLogsContainer">
          {filteredWorkouts.length === 0 ? (
            <p>No workouts found. Start logging your workouts!</p>
          ) : (
            filteredWorkouts.map((workout) => (
              <div key={workout.workoutID} className="workoutLogItem">
                <h3>{workout.exerciseType}</h3>
                <p><strong>Duration:</strong> {workout.duration} minutes</p>
                <p><strong>Calories Burned:</strong> {workout.caloriesBurned}</p>
                <p><strong>Date:</strong> {new Date(workout.workoutDate).toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}</p>
                <div className="workout-actions">
                  <button onClick={() => handleUpdate(workout.workoutID)} className="update-btn">Update</button>
                  <button onClick={() => handleDelete(workout.workoutID)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
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
