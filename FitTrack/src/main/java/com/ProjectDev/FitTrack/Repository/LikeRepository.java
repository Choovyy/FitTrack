package com.ProjectDev.FitTrack.Repository;

import com.ProjectDev.FitTrack.Entity.Like;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer> {
    @Transactional
@Modifying
@Query("DELETE FROM Like l WHERE l.post.postId = :postId")
void deleteByPostId(@Param("postId") Integer postId);

}
