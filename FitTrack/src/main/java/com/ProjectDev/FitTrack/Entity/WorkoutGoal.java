package com.ProjectDev.FitTrack.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "workout_goals")
public class WorkoutGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workoutID;

    private String goalDescription;

    private Integer targetCalories;

    private Integer targetDuration;

    private LocalDate deadline;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    @JsonBackReference  // Add this annotation to prevent infinite recursion
    private User user;

    public WorkoutGoal() {}

    public WorkoutGoal(String goalDescription, Integer targetCalories, Integer targetDuration, LocalDate deadline, User user) {
        this.goalDescription = goalDescription;
        this.targetCalories = targetCalories;
        this.targetDuration = targetDuration;
        this.deadline = deadline;
        this.user = user;
    }

    // Getters and Setters
    public Long getWorkoutID() {
        return workoutID;
    }

    public void setWorkoutID(Long workoutID) {
        this.workoutID = workoutID;
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

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
