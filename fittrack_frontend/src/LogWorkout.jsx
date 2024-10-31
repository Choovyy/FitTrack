// src/pages/LogWorkout.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import './Style/Workout.css';
import { createWorkout } from './LogWorkoutService'; // Import the service

const LogWorkout = () => {
    const [exerciseType, setExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const workoutData = {
                exerciseType,
                duration: parseInt(duration, 10),
                caloriesBurned: parseInt(caloriesBurned, 10)
            };
            await createWorkout(workoutData);
            alert('Workout saved!');
            navigate('/home');
        } catch (error) {
            console.error('Full error details:', error.response ? error.response.data : error.message);
            alert('Failed to save workout. Please try again.');
        }
    };
    
    

    const handleCancel = () => {
        navigate('/home');
    };

    return (
        <>
            <nav className="navbar">
                <ul className="navList">
                    <li className="navDashboard">
                        <Link to="/home" className="navLink">Dashboard</Link>
                    </li>
                    <li className="navLogworkout">
                        <Link to="/log-workout" className="navLink">Log Workout</Link>
                    </li>
                    <li className="navWorkoutGoal">
                        <Link to="/workout-goals" className="navLink">Workout Goal</Link>
                    </li>
                </ul>
            </nav>
            <div className="container">
                <h2>Log Your Workout</h2>
                <div className="formGroup">
                    <label>Exercise Type:</label>
                    <input 
                        type="text" 
                        value={exerciseType} 
                        onChange={(e) => setExerciseType(e.target.value)} 
                    />
                </div>
                <div className="formGroup">
                    <label>Duration (minutes):</label>
                    <input 
                        type="number" 
                        value={duration} 
                        onChange={(e) => setDuration(e.target.value)} 
                    />
                </div>
                <div className="formGroup">
                    <label>Calories Burned:</label>
                    <input 
                        type="number" 
                        value={caloriesBurned} 
                        onChange={(e) => setCaloriesBurned(e.target.value)} 
                    />
                </div>
                <button onClick={handleSave} className="saveButton">Save</button>
                <button onClick={handleCancel} className="cancelButton">Cancel</button>
            </div>
        </>
    );
};

export default LogWorkout;
