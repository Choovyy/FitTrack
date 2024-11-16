package com.ProjectDev.FitTrack.Entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postID;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String username; // Optional: if you want to store it separately
    private String content;
    private LocalDateTime timestamp;
    private Integer likeCount;

    // Default Constructor
    public Post() {}

    // Parameterized Constructor
    public Post(User user, String username, String content, LocalDateTime timestamp, Integer likeCount) {
        this.user = user;
        this.username = username;
        this.content = content;
        this.timestamp = timestamp;
        this.likeCount = likeCount;
    }

    // Getters and Setters
    public Integer getPostID() {
        return postID;
    }

    public void setPostID(Integer postID) {
        this.postID = postID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    @Override
    public String toString() {
        return "Post{" +
                "postID=" + postID +
                ", user=" + user.getName() + // Assuming User has a name field
                ", username='" + username + '\'' +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", likeCount=" + likeCount +
                '}';
    }
}
