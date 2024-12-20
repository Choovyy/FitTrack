package com.ProjectDev.FitTrack.Repository;

import com.ProjectDev.FitTrack.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
}
