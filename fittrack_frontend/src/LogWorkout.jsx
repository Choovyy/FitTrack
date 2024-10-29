// src/pages/LogWorkout.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const LogWorkout = () => {
    const [exerciseType, setExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');

    const handleSave = () => {
        console.log({ exerciseType, duration, caloriesBurned });
        alert('Workout saved!');
    };

    return (
        <>
            <nav className="navbar">
                <ul className="navList">
                    <li className="navItem">
                        <Link to="/dashboard" className="navLink">Dashboard</Link>
                    </li>
                    <li className="navItem">
                        <Link to="/log-workout" className="navLink">Log Workout</Link>
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
            </div>
        </>
    );
};

export default LogWorkout;
