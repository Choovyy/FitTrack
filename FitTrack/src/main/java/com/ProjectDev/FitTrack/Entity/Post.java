package com.ProjectDev.FitTrack.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postID")
    private Integer postID; 

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private User user;

    private String username;
    private String content;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "type")
    private String type;

    @Column(name = "likeCount", nullable = false)
    private Integer likeCount;

    public Post() {}

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
                ", user=" + user.getName() + 
                ", username='" + username + '\'' +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", likeCount=" + likeCount +
                '}';
    }
}
