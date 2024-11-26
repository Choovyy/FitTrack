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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment commentRequest) {
        if (commentRequest.getUser() == null || commentRequest.getPost() == null) {
            return ResponseEntity.badRequest().build();  
        }

        Optional<User> existingUser = userService.getUserById(commentRequest.getUser().getUserID());
        Optional<Post> existingPost = postService.getPostById(commentRequest.getPost().getPostId());

        if (!existingUser.isPresent()) {
            return ResponseEntity.badRequest().body(null); 
        }

        if (!existingPost.isPresent()) {
            return ResponseEntity.badRequest().body(null);  
        }

        commentRequest.setUser(existingUser.get());
        commentRequest.setPost(existingPost.get());
        commentRequest.setTimestamp(LocalDateTime.now());

        Comment savedComment = commentService.saveComment(commentRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }

    @GetMapping("/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable("postId") Long postId) {
        return commentService.getCommentsByPostId(postId); 
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable("commentId") Integer commentId, @RequestBody Comment updatedComment) {
        Comment updated = commentService.updateComment(commentId, updatedComment);
        if (updated != null) {
            return ResponseEntity.ok(updated);  
        }
        throw new IllegalArgumentException("Comment not found");  
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Integer commentId) {
        Optional<Comment> commentOptional = commentService.getCommentById(commentId);

        if (!commentOptional.isPresent()) {
            return ResponseEntity.notFound().build();  
        }

        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();  
    }
}
