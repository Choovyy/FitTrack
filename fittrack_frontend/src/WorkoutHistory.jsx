import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkoutHistory = () => {
    const [workouts, setWorkouts] = useState([]);
    const [editingWorkout, setEditingWorkout] = useState(null);
    const [workoutData, setWorkoutData] = useState({
        userID: '',
        exerciseType: '',
        duration: '',
        caloriesBurned: '',
        workoutDate: '',
    });

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/workouts');
            setWorkouts(response.data);
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    };

    const deleteWorkout = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/workouts/${id}`);
            setWorkouts(workouts.filter(workout => workout.id !== id));
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

    const handleEditClick = (workout) => {
        setEditingWorkout(workout.id);
        setWorkoutData({
            userID: workout.userID,
            exerciseType: workout.exerciseType,
            duration: workout.duration,
            caloriesBurned: workout.caloriesBurned,
            workoutDate: workout.workoutDate,
        });
    };

    const updateWorkout = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/workouts/${id}`, workoutData);
            setEditingWorkout(null);
            fetchWorkouts(); 
        } catch (error) {
            console.error("Error updating workout:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <h2>Workout History</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Exercise Type</th>
                        <th>Duration</th>
                        <th>Calories Burned</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map((workout) => (
                        <tr key={workout.id}>
                            <td>{editingWorkout === workout.id ? (
                                <input
                                    type="text"
                                    name="userID"
                                    value={workoutData.userID}
                                    onChange={handleChange}
                                />
                            ) : workout.userID}</td>
                            <td>{editingWorkout === workout.id ? (
                                <input
                                    type="text"
                                    name="exerciseType"
                                    value={workoutData.exerciseType}
                                    onChange={handleChange}
                                />
                            ) : workout.exerciseType}</td>
                            <td>{editingWorkout === workout.id ? (
                                <input
                                    type="text"
                                    name="duration"
                                    value={workoutData.duration}
                                    onChange={handleChange}
                                />
                            ) : workout.duration}</td>
                            <td>{editingWorkout === workout.id ? (
                                <input
                                    type="text"
                                    name="caloriesBurned"
                                    value={workoutData.caloriesBurned}
                                    onChange={handleChange}
                                />
                            ) : workout.caloriesBurned}</td>
                            <td>{editingWorkout === workout.id ? (
                                <input
                                    type="date"
                                    name="workoutDate"
                                    value={workoutData.workoutDate}
                                    onChange={handleChange}
                                />
                            ) : workout.workoutDate}</td>
                            <td>
                                {editingWorkout === workout.id ? (
                                    <>
                                        <button onClick={() => updateWorkout(workout.id)}>Save</button>
                                        <button onClick={() => setEditingWorkout(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(workout)}>Edit</button>
                                        <button onClick={() => deleteWorkout(workout.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorkoutHistory;

