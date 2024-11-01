package com.ProjectDev.FitTrack.Service;

import com.ProjectDev.FitTrack.Entity.Comment;
import com.ProjectDev.FitTrack.Repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Integer id) {
        return commentRepository.findById(id);
    }

    public void deleteComment(Integer id) {
        commentRepository.deleteById(id);
    }
}
