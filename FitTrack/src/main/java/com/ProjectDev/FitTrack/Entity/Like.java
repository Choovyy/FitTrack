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
<<<<<<< HEAD

    @Column(name = "userID", nullable = false)
    private Integer userID;

    @ManyToOne
    @JoinColumn(name = "postID", insertable = false, updatable = false)
    private Post post;

=======

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Like() {}

    public Like(Integer postID, User user) {
        this.postID = postID;
        this.user = user;
    }

    // Getters and Setters
>>>>>>> d64ad26b10e9c724c05bdb0ef9883d04c851f682
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
