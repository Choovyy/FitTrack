package com.ProjectDev.FitTrack.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentID;
    private Integer postID;
    private String commentText;
    private LocalDateTime timeStamp;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Comment() {}

    public Comment(Integer postID, String commentText, LocalDateTime timeStamp, User user) {
        this.postID = postID;
        this.commentText = commentText;
        this.timeStamp = timeStamp;
        this.user = user;
    }

    // Getters and Setters
    public Integer getCommentID() {
        return commentID;
    }

    public void setCommentID(Integer commentID) { 
        this.commentID = commentID; 
    }

    public Post getPost() { 
        return post; 
    }

    public void setPost(Post post) { 
        this.post = post; 
    }

    public User getUser() { 
        return user; 
    }

    public void setUser(User user) { 
        this.user = user; 
    }

    public String getContent() { 
        return content; 
    }

    public void setContent(String content) { 
        this.content = content; 
    }

    public LocalDateTime getTimestamp() { 
        return timestamp; 
    }

    public void setTimestamp(LocalDateTime timestamp) { 
        this.timestamp = timestamp; 
    }
}
