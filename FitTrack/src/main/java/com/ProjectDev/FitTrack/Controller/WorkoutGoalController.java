package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Entity.User;
import com.ProjectDev.FitTrack.Entity.WorkoutGoal;
import com.ProjectDev.FitTrack.Service.UserService;
import com.ProjectDev.FitTrack.Service.WorkoutGoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;	
// ayaw nani pang hilabti
@RequestMapping("/api/workout-goals")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from the frontend
@RestController
public class WorkoutGoalController {

    @Autowired
    private WorkoutGoalService workoutGoalService;

    @Autowired
    private UserService userService;

    // Handle OPTIONS request for CORS preflight
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok().build();
    }

    @PostMapping
public ResponseEntity<String> createWorkoutGoal(@RequestBody WorkoutGoal workoutGoal) {
    // Validate that userID is provided
    if (workoutGoal.getUser() == null || workoutGoal.getUser().getUserID() == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID is required");
    }

    // Look up the user by ID
    Optional<User> userOptional = userService.getUserById(workoutGoal.getUser().getUserID());
    if (userOptional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // Set the User for the goal
    workoutGoal.setUser(userOptional.get());

    // Save the workout goal
    workoutGoalService.saveWorkoutGoal(workoutGoal);
    return ResponseEntity.status(HttpStatus.CREATED).body("Workout Goal created successfully for User ID: " + workoutGoal.getUser().getUserID());
}


    // Get all Workout Goals
    @GetMapping
    public List<WorkoutGoal> getAllWorkoutGoals() {
        return workoutGoalService.getAllWorkoutGoals();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WorkoutGoal>> getWorkoutGoalsByUserId(@PathVariable Integer userId) {
        List<WorkoutGoal> workoutGoals = workoutGoalService.getWorkoutGoalsByUserId(userId);
        return ResponseEntity.ok(workoutGoals);
    }

    // Get a Workout Goal by ID
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutGoal> getWorkoutGoalById(@PathVariable Long id) {
        return workoutGoalService.getWorkoutGoalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an existing Workout Goal
    @PutMapping("/{id}")
    public ResponseEntity<WorkoutGoal> updateWorkoutGoal(@PathVariable Long id, @RequestBody WorkoutGoal workoutGoal) {
        return workoutGoalService.getWorkoutGoalById(id)
                .map(existingGoal -> {
                    existingGoal.setUser(workoutGoal.getUser());
                    existingGoal.setGoalDescription(workoutGoal.getGoalDescription());
                    existingGoal.setTargetCalories(workoutGoal.getTargetCalories());
                    existingGoal.setTargetDuration(workoutGoal.getTargetDuration());
                    existingGoal.setDeadline(workoutGoal.getDeadline());
                    WorkoutGoal updatedGoal = workoutGoalService.saveWorkoutGoal(existingGoal);
                    return ResponseEntity.ok(updatedGoal);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a Workout Goal
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWorkoutGoal(@PathVariable Long id) {
        if (workoutGoalService.getWorkoutGoalById(id).isPresent()) {
            workoutGoalService.deleteWorkoutGoal(id);
            return ResponseEntity.ok("Workout Goal with ID " + id + " has been successfully deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
