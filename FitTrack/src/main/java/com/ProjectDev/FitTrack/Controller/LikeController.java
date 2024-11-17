package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts/{postId}/like")
@CrossOrigin(origins = "http://localhost:5173")
public class LikeController {
    @Autowired
    private PostService postService;

    @PutMapping
    public void likePost(@PathVariable Integer postId) {
        postService.incrementLikeCount(postId);
    }
}
