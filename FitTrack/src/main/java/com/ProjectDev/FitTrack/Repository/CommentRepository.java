package com.ProjectDev.FitTrack.Repository;

import com.ProjectDev.FitTrack.Entity.Comment;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByPost_PostId(Long postId);
    

    @Transactional
@Modifying
@Query("DELETE FROM Comment c WHERE c.post.postId = :postId")
void deleteByPostId(@Param("postId") Integer postId);
}
