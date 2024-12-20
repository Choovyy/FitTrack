import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/workout-goals';

// Function to create a new workout goal
export const createWorkoutGoal = async (goalData) => {
  // Check if the userID is present in goalData
  const userID = goalData.user?.userID;
  if (!userID) {
    console.error('User ID is missing');
    throw new Error('User ID is required to create a workout goal');
  }

  try {
    const response = await axios.post(API_BASE_URL, goalData); // Use base API URL for creating goals
    return response.data; // Return the response data from the server
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('Error in createWorkoutGoal:', message);
    throw new Error(message); // Rethrow the error with a message for better handling in the caller
  }
};

// Function to get all workout goals
export const getAllWorkoutGoals = async (userID) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/workout-goals/user/${userID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching workout goals:', error);
    throw error;
  }
};

// Function to delete a workout goal by ID
export const deleteWorkoutGoal = async (goalId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${goalId}`);
    return response.data; // Assuming the response contains the deleted goal or confirmation
  } catch (error) {
    console.error('Error in deleteWorkoutGoal:', error.response || error.message);
    throw new Error('Failed to delete workout goal');
  }
};
