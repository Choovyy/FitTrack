import React, { useEffect, useState } from 'react';
import { getAllWorkoutGoals } from './WorkoutGoalService'; // Update the import to match your service

const WorkoutGoalList = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await getAllWorkoutGoals(); // Call your service function
        setGoals(response); // Assuming response contains the data directly
      } catch (error) {
        console.error('Error fetching workout goals:', error);
      }
    };
    fetchGoals();
  }, []);

  return (
    <div>
      <h2>Workout Goals</h2>
      <ul>
        {goals.map(goal => (
          <li key={goal.workoutID}>{goal.goalDescription}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutGoalList;
