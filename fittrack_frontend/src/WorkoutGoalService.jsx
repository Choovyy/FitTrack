// WorkoutGoalService.jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/workout-goals';

// Create a new workout goal
export const createWorkoutGoal = async (goalData) => {
  return await axios.post(`${API_BASE_URL}/create`, goalData);
};

// Get all workout goals
export const getAllWorkoutGoals = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Delete a workout goal by ID
export const deleteWorkoutGoal = async (goalId) => {
  return await axios.delete(`${API_BASE_URL}/${goalId}`);
};
