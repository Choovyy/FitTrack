package com.ProjectDev.FitTrack.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "workout_goals")
public class WorkoutGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workoutID;      // Changed to workoutID
    private Long userID;         // Added userID
    private String goalDescription;
    private Integer targetCalories;   // Changed to Integer for calories
    private Integer targetDuration;    // Changed to Integer for duration
    private String deadline;

    // Constructors
    public WorkoutGoal() {}

    public WorkoutGoal(Long userID, String goalDescription, Integer targetCalories, Integer targetDuration, String deadline) {
        this.userID = userID;
        this.goalDescription = goalDescription;
        this.targetCalories = targetCalories;
        this.targetDuration = targetDuration;
        this.deadline = deadline;
    }

    // Getters and Setters
    public Long getWorkoutID() {
        return workoutID;
    }

    public void setWorkoutID(Long workoutID) {
        this.workoutID = workoutID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getGoalDescription() {
        return goalDescription;
    }

    public void setGoalDescription(String goalDescription) {
        this.goalDescription = goalDescription;
    }

    public Integer getTargetCalories() {
        return targetCalories;
    }

    public void setTargetCalories(Integer targetCalories) {
        this.targetCalories = targetCalories;
    }

    public Integer getTargetDuration() {
        return targetDuration;
    }

    public void setTargetDuration(Integer targetDuration) {
        this.targetDuration = targetDuration;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }
}
