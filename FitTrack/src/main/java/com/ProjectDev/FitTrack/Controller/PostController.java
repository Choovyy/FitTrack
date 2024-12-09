    package com.ProjectDev.FitTrack.Controller;

    import com.ProjectDev.FitTrack.Entity.Post;
    import com.ProjectDev.FitTrack.Entity.User;
    import com.ProjectDev.FitTrack.Repository.UserRepository;
    import com.ProjectDev.FitTrack.Service.CommentService;
    import com.ProjectDev.FitTrack.Service.PostService;
    import com.ProjectDev.FitTrack.Service.LikeService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;
    import java.util.Optional;

    @RestController
    @RequestMapping("/posts")
    @CrossOrigin(origins = "http://localhost:5173")
    public class PostController {

        @Autowired
        private PostService postService;
        
        @Autowired
        private UserRepository userRepository;

        @Autowired
        private CommentService commentService;

        @Autowired
        private LikeService likeService;

        @GetMapping
        public ResponseEntity<List<Post>> getAllPosts() {
            List<Post> posts = postService.getAllPosts();
            return ResponseEntity.ok(posts);
        }

        @GetMapping("/{id}")
        public ResponseEntity<Optional<Post>> getPostById(@PathVariable Integer id) {
            Optional<Post> post = postService.getPostById(id);
            return post != null ? ResponseEntity.ok(post) : ResponseEntity.notFound().build();
        }

        @PostMapping
        public ResponseEntity<?> createPost(@RequestBody Post post) {
            if (post.getUser() == null || post.getUser().getUserID() == null) {
                return ResponseEntity.badRequest().body("User information is missing.");
            }
            
            User user = userRepository.findById(post.getUser().getUserID())
                                    .orElseThrow(() -> new RuntimeException("User not found"));

            post.setUser(user);

            if (post.getContent() == null || post.getContent().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Post content cannot be empty.");
            }

            Post savedPost = postService.savePost(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
        }



        @PutMapping("/{id}")
        public ResponseEntity<?> updatePost(@PathVariable Integer id, @RequestBody Post updatedPost) {
            if (updatedPost.getContent() == null || updatedPost.getContent().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Content cannot be empty.");
            }
            Post updated = postService.updatePost(id, updatedPost);
            return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
        }

        @Transactional
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deletePost(@PathVariable Integer id) {
            try {
                // Delete associated likes
                likeService.deleteLikesByPostId(id);
        
                // Delete associated comments
                commentService.deleteCommentsByPostId(id);
        
                // Delete the post
                postService.deletePost(id);
        
                return ResponseEntity.noContent().build();
            } catch (Exception e) {
                System.err.println("Error deleting post: " + e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    }
