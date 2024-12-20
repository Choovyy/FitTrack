package com.ProjectDev.FitTrack.Service;

import com.ProjectDev.FitTrack.Entity.WorkoutGoal;
import com.ProjectDev.FitTrack.Repository.WorkoutGoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutGoalService {

    @Autowired
    private WorkoutGoalRepository workoutGoalRepository;

    // Create or Update a Workout Goal
    public WorkoutGoal saveWorkoutGoal(WorkoutGoal workoutGoal) {
        return workoutGoalRepository.save(workoutGoal);
    }

    // Get a list of all Workout Goals
    public List<WorkoutGoal> getAllWorkoutGoals() {
        return workoutGoalRepository.findAll();
    }

    // Get a specific Workout Goal by ID
    public Optional<WorkoutGoal> getWorkoutGoalById(Long id) {
        return workoutGoalRepository.findById(id);
    }

    // Delete a Workout Goal by ID
    public void deleteWorkoutGoal(Long id) {
        workoutGoalRepository.deleteById(id);
    }

    public List<WorkoutGoal> getWorkoutGoalsByUserId(Integer userID) {
        return workoutGoalRepository.findByUser_UserID(userID);
    }
}

