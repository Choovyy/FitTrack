package com.ProjectDev.FitTrack.Entity;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonBackReference;
=======
>>>>>>> d64ad26b10e9c724c05bdb0ef9883d04c851f682
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentID")
    private Integer commentID;

    @Column(name = "postID", nullable = false)
    private Integer postID;
<<<<<<< HEAD

    @Column(name = "userID", nullable = false)
    private Integer userID;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "postID", insertable = false, updatable = false)
    @JsonBackReference 
    private Post post;

    @PrePersist
    public void setTimestamp() {
        if (this.timestamp == null) {
            this.timestamp = LocalDateTime.now();
        }
=======
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
>>>>>>> d64ad26b10e9c724c05bdb0ef9883d04c851f682
    }

    public Integer getCommentID() {
        return commentID;
    }

    public void setCommentID(Integer commentID) {
        this.commentID = commentID;
    }

    public Integer getPostID() {
        return postID;
    }

    public void setPostID(Integer postID) {
        this.postID = postID;
    }

<<<<<<< HEAD
    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getContent() {
        return content;
=======
    public String getCommentText() {
        return commentText;
>>>>>>> d64ad26b10e9c724c05bdb0ef9883d04c851f682
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
}
