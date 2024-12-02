package com.ProjectDev.FitTrack.Entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workoutID;
    private String exerciseType;
    private int duration;
    private int caloriesBurned;

    @CreationTimestamp
    @Column(name = "workout_date", updatable = false)
    private LocalDateTime workoutDate;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private User user;

    public Workout() {}

    public Workout(String exerciseType, int duration, int caloriesBurned, User user) {
        this.exerciseType = exerciseType;
        this.duration = duration;
        this.caloriesBurned = caloriesBurned;
        this.user = user;
    }

    // Getters and Setters
    public Long getWorkoutID() {
        return workoutID;
    }

    public void setWorkoutID(Long workoutID) {
        this.workoutID = workoutID;
    }

    public String getExerciseType() {
        return exerciseType;
    }

    public void setExerciseType(String exerciseType) {
        this.exerciseType = exerciseType;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public LocalDateTime getWorkoutDate() {
        return workoutDate;
    }

    public void setWorkoutDate(LocalDateTime workoutDate) {
        this.workoutDate = workoutDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
