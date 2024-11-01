package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Entity.WorkoutGoal;
import com.ProjectDev.FitTrack.Service.WorkoutGoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/workout-goals")
public class WorkoutGoalController {

    @Autowired
    private WorkoutGoalService workoutGoalService;

    // Handle OPTIONS request for CORS preflight
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok().build();
    }

    // Create a new Workout Goal
    @PostMapping("/create")
    public WorkoutGoal createWorkoutGoal(@RequestBody WorkoutGoal workoutGoal) {
        return workoutGoalService.saveWorkoutGoal(workoutGoal);
    }

    // Get all Workout Goals
    @GetMapping
    public List<WorkoutGoal> getAllWorkoutGoals() {
        return workoutGoalService.getAllWorkoutGoals();
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
                    existingGoal.setUserID(workoutGoal.getUserID());
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