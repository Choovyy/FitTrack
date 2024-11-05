package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Entity.Post;
import com.ProjectDev.FitTrack.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        post.setTimestamp(LocalDateTime.now());
        return postService.savePost(post);
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Integer id) {
        return postService.getPostById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable Integer id) {
        postService.deletePost(id);
        return "Post deleted successfully.";
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable Integer id, @RequestBody Post post) {
        post.setPostID(id); 
        post.setTimestamp(LocalDateTime.now()); 
        return postService.updatePost(post);
    }
}
