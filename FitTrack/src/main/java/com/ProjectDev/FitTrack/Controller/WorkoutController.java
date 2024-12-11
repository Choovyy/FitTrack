package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Entity.Workout;
import com.ProjectDev.FitTrack.Entity.User;
import com.ProjectDev.FitTrack.Service.WorkoutService;
import com.ProjectDev.FitTrack.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    @Autowired
    private UserService userService;  // Inject UserService to access user data

    // Create a new workout
    @PostMapping
    public ResponseEntity<String> createWorkout(@RequestBody Workout workout) {
        // Validate if the user ID is provided
        if (workout.getUser() == null || workout.getUser().getUserID() == null) {
            return ResponseEntity.badRequest().body("User ID is required to create a workout.");
        }

        // Retrieve the user from the database
        Optional<User> userOptional = userService.getUserById(workout.getUser().getUserID());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Associate the fetched user with the workout
        workout.setUser(userOptional.get());

        // Save the workout
        Workout savedWorkout = workoutService.saveWorkout(workout);
        return ResponseEntity.status(HttpStatus.CREATED).body("Workout created successfully with ID: " + savedWorkout.getWorkoutID());
    }

    // Get all workouts
    @GetMapping
    public List<Workout> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    // Get workouts by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Workout>> getWorkoutsByUserId(@PathVariable Integer userId) {
        List<Workout> workouts = workoutService.getWorkoutsByUserId(userId);
        return ResponseEntity.ok(workouts);
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
                    // Update workout details
                    existingWorkout.setExerciseType(workout.getExerciseType());
                    existingWorkout.setDuration(workout.getDuration());
                    existingWorkout.setCaloriesBurned(workout.getCaloriesBurned());
                    existingWorkout.setWorkoutDate(workout.getWorkoutDate());

                    // Handle user update
                    if (workout.getUser() != null && workout.getUser().getUserID() != null) {
                        Optional<User> userOptional = userService.getUserById(workout.getUser().getUserID());
                        userOptional.ifPresent(existingWorkout::setUser);
                    }

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
