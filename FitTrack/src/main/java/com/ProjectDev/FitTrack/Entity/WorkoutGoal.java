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
    private Long id;
    private String goalDescription;
    private String targetMetrics; // e.g., distance, calories, time
    private String deadline;

    // Constructors
    public WorkoutGoal() {}

    public WorkoutGoal(String goalDescription, String targetMetrics, String deadline) {
        this.goalDescription = goalDescription;
        this.targetMetrics = targetMetrics;
        this.deadline = deadline;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGoalDescription() {
        return goalDescription;
    }

    public void setGoalDescription(String goalDescription) {
        this.goalDescription = goalDescription;
    }

    public String getTargetMetrics() {
        return targetMetrics;
    }

    public void setTargetMetrics(String targetMetrics) {
        this.targetMetrics = targetMetrics;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }
}

