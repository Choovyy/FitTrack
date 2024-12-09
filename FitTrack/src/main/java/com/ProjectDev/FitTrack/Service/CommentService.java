package com.ProjectDev.FitTrack.Service;

import com.ProjectDev.FitTrack.Entity.Comment;
import com.ProjectDev.FitTrack.Entity.User;
import com.ProjectDev.FitTrack.Entity.Post;
import com.ProjectDev.FitTrack.Repository.CommentRepository;
import com.ProjectDev.FitTrack.Repository.PostRepository;
import com.ProjectDev.FitTrack.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Integer id) {
        return commentRepository.findById(id);
    }

    public Comment saveComment(Comment comment) {
        if (comment.getUser() == null || comment.getPost() == null) {
            throw new IllegalArgumentException("User or Post cannot be null");
        }

        User user = userRepository.findById(comment.getUser().getUserID())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = postRepository.findById(comment.getPost().getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        comment.setUser(user);
        comment.setPost(post);

        return commentRepository.save(comment);
    }

    public Comment updateComment(Integer id, Comment updatedComment) {
        Optional<Comment> commentOptional = commentRepository.findById(id);
        if (commentOptional.isPresent()) {
            Comment existingComment = commentOptional.get();
            existingComment.setContent(updatedComment.getContent());
            return commentRepository.save(existingComment);
        }
        return null;
    }

    public void deleteComment(Integer id) {
        commentRepository.deleteById(id);
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPost_PostId(postId);
    }

    


    public void deleteCommentsByPostId(Integer postId) {
        commentRepository.deleteByPostId(postId);
    }

}