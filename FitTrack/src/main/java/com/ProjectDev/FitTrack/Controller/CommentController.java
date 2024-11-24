package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Entity.Comment;
import com.ProjectDev.FitTrack.Service.CommentService;
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

    @PostMapping
    public ResponseEntity<String> createOrUpdateComment(@RequestBody Comment comment) {
        if (comment.getContent() == null || ((String) comment.getContent()).isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Comment content cannot be empty.");
        }
        comment.setTimeStamp(LocalDateTime.now());
        Comment savedComment = commentService.saveComment(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body("Comment created successfully with ID: " + savedComment.getCommentID());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getComment(@PathVariable Integer id) {
        Optional<Comment> optionalComment = commentService.getCommentById(id);
        return optionalComment
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments.isEmpty() ? List.of() : comments);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateComment(@PathVariable Integer id, @RequestBody Comment updatedComment) {
        Optional<Comment> optionalComment = commentService.getCommentById(id);
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            comment.setContent(updatedComment.getContent());
            comment.setTimeStamp(LocalDateTime.now());
            commentService.saveComment(comment);
            return ResponseEntity.ok("Comment updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comment not found.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer id) {
        Optional<Comment> optionalComment = commentService.getCommentById(id);
        if (optionalComment.isPresent()) {
            commentService.deleteComment(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Comment deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comment not found.");
        }
    }
}
