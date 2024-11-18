package com.ProjectDev.FitTrack.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "likeID")
    private Integer likeID;

    @Column(name = "postID", nullable = false)
    private Integer postID;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private User user;

    public Like() {}

    public Like(Integer postID, User user) {
        this.postID = postID;
        this.user = user;
    }

    // Getters and Setters
    public Integer getLikeID() {
        return likeID;
    }

    public void setLikeID(Integer likeID) {
        this.likeID = likeID;
    }

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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
