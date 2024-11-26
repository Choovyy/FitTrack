package com.ProjectDev.FitTrack.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.ProjectDev.FitTrack.Serializer.UserSerializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Table(name = "post")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postid")
    private Integer postId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID", nullable = false)
    @JsonSerialize(using = UserSerializer.class)
    private User user;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "timestamp", nullable = false, updatable = false)
    private LocalDateTime timestamp;

    @Column(name = "type")
    private String type;

    @Column(name = "like_count", nullable = false)
    private Integer likeCount = 0;

    public Post() {}

    public Post(User user, String content, String type, Integer likeCount) {
        this.user = user;
        this.content = content;
        this.type = type;
        this.likeCount = likeCount;
    }

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }
    
    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
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
                "postId=" + postId +
                ", user=" + (user != null ? user.getName() : "null") +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", type='" + type + '\'' +
                ", likeCount=" + likeCount +
                '}';
    }
}
