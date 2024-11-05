import React, { useEffect, useState } from 'react';
import { getAllWorkouts, deleteWorkout } from './LogWorkoutService';
import { Link } from 'react-router-dom'; // Link for navigating to the update page
import './Style/Workout.css'; // CSS for improved styling

function WorkoutDashboard() {
  const [workouts, setWorkouts] = useState([]);
  
  // Fetch workout logs when the component loads
  useEffect(() => {
    const fetchWorkouts = async () => {
        try {
          const workoutData = await getAllWorkouts();
          console.log("Workout Data:", workoutData); // Check the workoutDate value here
          setWorkouts(workoutData);
        } catch (error) {
          console.error('Error fetching workouts:', error);
        }
      };          

    fetchWorkouts();
  }, []);

  // Handle deleting a workout
  const handleDelete = async (workoutID) => {
    try {
      await deleteWorkout(workoutID); // Call to API for deleting the workout
      setWorkouts(workouts.filter(workout => workout.workoutID !== workoutID)); // Update the state
      alert('Workout deleted successfully!');
    } catch (error) {
      console.error('Error deleting workout:', error);
      alert('Failed to delete workout');
    }
  };

  return (
    <div className="workout-dashboard">
      <h2>Workout Logs</h2>
      <div className="workout-list">
        {workouts.length === 0 ? (
          <p>No workouts found. Start logging your workouts!</p>
        ) : (
          workouts.map((workout) => (
            <div key={workout.workoutID} className="workout-card">
              <h3>{workout.exerciseType}</h3>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              <p><strong>Calories Burned:</strong> {workout.caloriesBurned}</p>
              <p><strong>Date:</strong> {new Date(workout.workoutDate).toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}</p>
              <div className="workout-actions">
                <Link to={`/update-workout/${workout.workoutID}`} className="update-btn">Update</Link>
                <button onClick={() => handleDelete(workout.workoutID)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WorkoutDashboard;
