import axios from 'axios';

// Explicitly set the backend API URL
const API_URL = 'http://localhost:8080/api/workouts';

// Function to create a new workout entry
export const createWorkout = async (workoutData) => {
  try {
    const response = await axios.post(API_URL, workoutData);
    return response.data;
  } catch (error) {
    console.error("Error creating workout:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to get all workouts (if needed)
export const getAllWorkouts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to delete a workout entry (if needed)
export const deleteWorkout = async (workoutId) => {
  try {
    await axios.delete(`${API_URL}/${workoutId}`);
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
