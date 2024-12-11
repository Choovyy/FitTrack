package com.ProjectDev.FitTrack.Service;

import com.ProjectDev.FitTrack.Entity.Post;
import com.ProjectDev.FitTrack.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Integer id) {
        return postRepository.findById(id);
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public Post updatePost(Integer id, Post updatedPost) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

        post.setContent(updatedPost.getContent());
        post.setType(updatedPost.getType());
        post.setTimestamp(LocalDateTime.now()); 

        return postRepository.save(post);
    }

    public void deletePost(Integer id) {
        postRepository.deleteById(id);
    }

    public void incrementLikeCount(Integer postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            post.setLikeCount(post.getLikeCount() + 1);
            postRepository.save(post);
        }
    }

    public void decrementLikeCount(Integer postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null && post.getLikeCount() > 0) { 
            post.setLikeCount(post.getLikeCount() - 1);
            postRepository.save(post);
        }
    }
    
}