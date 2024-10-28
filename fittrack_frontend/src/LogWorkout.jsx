// src/pages/LogWorkout.jsx
import React, { useState } from 'react';

const LogWorkout = () => {
    const [exerciseType, setExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');

    const handleSave = () => {
        // Handle save logic here, e.g., sending data to backend or state management
        console.log({ exerciseType, duration, caloriesBurned });
        alert('Workout saved!');
    };

    return (
        <div style={styles.container}>
            <h2>Log Your Workout</h2>
            <div style={styles.formGroup}>
                <label>Exercise Type:</label>
                <input 
                    type="text" 
                    value={exerciseType} 
                    onChange={(e) => setExerciseType(e.target.value)} 
                />
            </div>
            <div style={styles.formGroup}>
                <label>Duration (minutes):</label>
                <input 
                    type="number" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)} 
                />
            </div>
            <div style={styles.formGroup}>
                <label>Calories Burned:</label>
                <input 
                    type="number" 
                    value={caloriesBurned} 
                    onChange={(e) => setCaloriesBurned(e.target.value)} 
                />
            </div>
            <button onClick={handleSave} style={styles.saveButton}>Save</button>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)'
    },
    formGroup: {
        marginBottom: '15px'
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default LogWorkout;
