package com.ProjectDev.FitTrack.Repository;

import com.ProjectDev.FitTrack.Entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer> {
}
