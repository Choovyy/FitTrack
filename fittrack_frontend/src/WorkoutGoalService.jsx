import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/workout-goals';

export const createWorkoutGoal = async (goalData) => {
  return await axios.post(`${API_BASE_URL}/create`, goalData);
};

export const getAllWorkoutGoals = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const deleteWorkoutGoal = async (goalId) => {
  return await axios.delete(`${API_BASE_URL}/${goalId}`);
};
