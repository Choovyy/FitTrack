package com.ProjectDev.FitTrack.Repository;

import com.ProjectDev.FitTrack.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByPost_PostId(Long postId);
}
