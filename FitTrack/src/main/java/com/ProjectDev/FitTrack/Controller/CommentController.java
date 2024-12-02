package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Entity.Comment;
import com.ProjectDev.FitTrack.Entity.Post;
import com.ProjectDev.FitTrack.Entity.User;
import com.ProjectDev.FitTrack.Service.CommentService;
import com.ProjectDev.FitTrack.Service.PostService;
import com.ProjectDev.FitTrack.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<?> createComment(@RequestBody Comment commentRequest) {
        logger.info("Received Comment Request: {}", commentRequest);

        if (commentRequest.getUser() == null || commentRequest.getPost() == null) {
            logger.error("Missing user or post in the comment request");
            return ResponseEntity.badRequest().body("User and Post must be provided.");
        }

        Optional<User> existingUser = userService.getUserById(commentRequest.getUser().getUserID());
        Optional<Post> existingPost = postService.getPostById(commentRequest.getPost().getPostId());

        if (!existingUser.isPresent()) {
            logger.error("User with ID {} not found", commentRequest.getUser().getUserID());
            return ResponseEntity.badRequest().body("Invalid User ID.");
        }

        if (!existingPost.isPresent()) {
            logger.error("Post with ID {} not found", commentRequest.getPost().getPostId());
            return ResponseEntity.badRequest().body("Invalid Post ID.");
        }

        commentRequest.setUser(existingUser.get());
        commentRequest.setPost(existingPost.get());
        commentRequest.setTimestamp(LocalDateTime.now());

        Comment savedComment = commentService.saveComment(commentRequest);
        logger.info("Comment saved successfully: {}", savedComment);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }


    @GetMapping("/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable("postId") Long postId) {
        logger.info("Fetching comments for post ID: {}", postId);
        return commentService.getCommentsByPostId(postId);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable("commentId") Integer commentId, @RequestBody Comment updatedComment) {
        logger.info("Updating comment ID: {} with data: {}", commentId, updatedComment);
        Comment updated = commentService.updateComment(commentId, updatedComment);
        if (updated != null) {
            logger.info("Comment updated successfully: {}", updated);
            return ResponseEntity.ok(updated);
        }
        logger.error("Comment not found for ID: {}", commentId);
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Integer commentId) {
        logger.info("Deleting comment ID: {}", commentId);
        Optional<Comment> commentOptional = commentService.getCommentById(commentId);

        if (!commentOptional.isPresent()) {
            logger.error("Comment not found for ID: {}", commentId);
            return ResponseEntity.notFound().build();
        }

        commentService.deleteComment(commentId);
        logger.info("Comment ID: {} deleted successfully", commentId);
        return ResponseEntity.noContent().build();
    }
}
