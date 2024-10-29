import React, { useState } from 'react';
import './WorkoutHistory.css';

const App = () => {
  const [workouts, setWorkouts] = useState([
    { date: '2024-09-01', type: 'Running', duration: '30 mins', calories: '300 cal' },
    { date: '2024-09-11', type: 'Cycling', duration: '20 mins', calories: '400 cal' },
    { date: '2024-09-14', type: 'Yoga', duration: '50 mins', calories: '500 cal' },
  ]);

  const handleEdit = (index) => {
    // Handle edit logic here
    alert(`Edit workout at index: ${index}`);
  };

  const handleDelete = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setWorkouts(newWorkouts);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Workout History</h1>
      </header>
      <div className="workout-table">
        <div className="table-header">
          <div>Date</div>
          <div>Exercise Type</div>
          <div>Duration</div>
          <div>Calories</div>
          <div>Actions</div>
        </div>
        {workouts.map((workout, index) => (
          <div key={index} className="table-row">
            <div>{workout.date}</div>
            <div>{workout.type}</div>
            <div>{workout.duration}</div>
            <div>{workout.calories}</div>
            <div>
              <button onClick={() => handleEdit(index)} className="edit-btn">EDIT</button>
              <button onClick={() => handleDelete(index)} className="delete-btn">DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
