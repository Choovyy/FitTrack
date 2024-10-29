package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Entity.Workout;
import com.ProjectDev.FitTrack.Service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    // Create a new workout
    @PostMapping
    public Workout createWorkout(@RequestBody Workout workout) {
        return workoutService.saveWorkout(workout);
    }

    // Get all workouts
    @GetMapping
    public List<Workout> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    // Get a workout by ID
    @GetMapping("/{id}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable Long id) {
        return workoutService.getWorkoutById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an existing workout
    @PutMapping("/{id}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable Long id, @RequestBody Workout workout) {
        return workoutService.getWorkoutById(id)
                .map(existingWorkout -> {
                    existingWorkout.setUserID(workout.getUserID());
                    existingWorkout.setExerciseType(workout.getExerciseType());
                    existingWorkout.setDuration(workout.getDuration());
                    existingWorkout.setCaloriesBurned(workout.getCaloriesBurned());
                    existingWorkout.setWorkoutDate(workout.getWorkoutDate());
                    Workout updatedWorkout = workoutService.saveWorkout(existingWorkout);
                    return ResponseEntity.ok(updatedWorkout);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a workout
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWorkout(@PathVariable Long id) {
        if (workoutService.getWorkoutById(id).isPresent()) {
            workoutService.deleteWorkout(id);
            return ResponseEntity.ok("Workout with ID " + id + " has been successfully deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
