package com.ProjectDev.FitTrack.Repository;

import com.ProjectDev.FitTrack.Entity.WorkoutGoal;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutGoalRepository extends JpaRepository<WorkoutGoal, Long> {
    List<WorkoutGoal> findByUser_UserID(Integer userID);
}

