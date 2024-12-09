	package com.ProjectDev.FitTrack.Entity;
	
	import jakarta.persistence.*;
	
	@Entity
	@Table(name = "likes")
	public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "likeid")
    private Integer likeId;

    @ManyToOne
    @JoinColumn(name = "postid", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    public Like() {}

    public Like(Post post, User user) {
        this.post = post;
        this.user = user;
    }

    // Getters and Setters

    public Integer getLikeId() {
        return likeId;
    }

    public void setLikeId(Integer likeId) {
        this.likeId = likeId;
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
