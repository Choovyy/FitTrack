// WorkoutDashboard.js
import React, { useEffect, useState } from 'react';
import LogWorkout from './LogWorkout';
import { getAllWorkouts } from './LogWorkoutService';

function WorkoutDashboard() {
    const [workouts, setWorkouts] = useState([]);

    // Fetch workout logs when the component loads
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const workoutData = await getAllWorkouts();
                setWorkouts(workoutData);
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div>

            <h2>Workout Logs</h2>
            <ul className='lists'>
                {workouts.map((workout) => (
                    <li key={workout.workoutID}>
                        <p>Exercise Type: {workout.exerciseType}</p>
                        <p>Duration: {workout.duration} minutes</p>
                        <p>Calories Burned: {workout.caloriesBurned}</p>
                        <p>Date: {new Date(workout.workoutDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WorkoutDashboard;
