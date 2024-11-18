package com.ProjectDev.FitTrack.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentID")
    private Integer commentID;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "postid", referencedColumnName = "postID")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "userID")
    private User user;

    private String content;

    @Column(name = "timestamp", nullable = false) // Adjust to use only one column
    private LocalDateTime timestamp;

    @PrePersist
    public void setTimestamp() {
        if (this.timestamp == null) {
            this.timestamp = LocalDateTime.now();
        }
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
