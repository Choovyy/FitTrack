import React, { useEffect, useState } from 'react';
import { getAllWorkoutGoals, deleteWorkoutGoal } from './WorkoutGoalService'; // Update the import path

const WorkoutGoalPage = () => {
  const [workoutGoals, setWorkoutGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await getAllWorkoutGoals();
        setWorkoutGoals(response); // Assuming response contains the data directly
      } catch (error) {
        console.error('Error fetching workout goals:', error);
      }
    };

    fetchGoals();
  }, []);

  const handleDelete = async (goalId) => {
    try {
      await deleteWorkoutGoal(goalId);
      setWorkoutGoals(workoutGoals.filter(goal => goal.workoutID !== goalId));
    } catch (error) {
      console.error('Error deleting workout goal:', error);
    }
  };

  return (
    <div>
      <h1>Your Workout Goals</h1>
      <ul>
        {workoutGoals.map(goal => (
          <li key={goal.workoutID}>
            <span>{goal.goalDescription} - {goal.targetCalories} calories</span>
            <button onClick={() => handleDelete(goal.workoutID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutGoalPage;
