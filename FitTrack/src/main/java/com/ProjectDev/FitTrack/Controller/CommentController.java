package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Entity.Comment;
import com.ProjectDev.FitTrack.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.saveComment(comment);
    }

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Integer id) {
        return commentService.getCommentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Integer id, @RequestBody Comment comment) {
        return commentService.getCommentById(id)
                .map(existingComment -> {
                    existingComment.setCommentText(comment.getCommentText());
                    existingComment.setTimeStamp(comment.getTimeStamp());
                    Comment updatedComment = commentService.saveComment(existingComment);
                    return ResponseEntity.ok(updatedComment);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer id) {
        if (commentService.getCommentById(id).isPresent()) {
            commentService.deleteComment(id);
            return ResponseEntity.ok("Comment with ID " + id + " has been successfully deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
