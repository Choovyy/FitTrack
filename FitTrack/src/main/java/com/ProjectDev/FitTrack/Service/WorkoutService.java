package com.ProjectDev.FitTrack.Service;

import com.ProjectDev.FitTrack.Entity.Workout;
import com.ProjectDev.FitTrack.Repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    // Save a new workout
    public Workout saveWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }

    // Get all workouts
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    // Get a workout by ID
    public Optional<Workout> getWorkoutById(Long id) {
        return workoutRepository.findById(id);
    }

    // Delete a workout by ID
    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }

    public List<Workout> getWorkoutsByUserId(Integer userId) {
        return workoutRepository.findByUser_UserID(userId);
    }
}
