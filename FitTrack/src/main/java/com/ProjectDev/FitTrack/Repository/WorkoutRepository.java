package com.ProjectDev.FitTrack.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ProjectDev.FitTrack.Entity.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    // You can add custom query methods here if needed
}