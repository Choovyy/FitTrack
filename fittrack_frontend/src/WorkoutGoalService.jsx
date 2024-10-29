import axios from 'axios';

const API_URL = 'http://localhost:8080/api/workout-goals'; // Ensure this is correct

// Function to create a new workout goal
export const createWorkoutGoal = async (goalData) => {
  try {
    const response = await axios.post(API_URL, goalData);
    return response.data;
  } catch (error) {
    console.error("Error creating workout goal:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to get all workout goals
export const getAllWorkoutGoals = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching workout goals:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to delete a workout goal
export const deleteWorkoutGoal = async (goalId) => {
  try {
    await axios.delete(`${API_URL}/${goalId}`);
  } catch (error) {
    console.error("Error deleting workout goal:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
