package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Entity.Like;
import com.ProjectDev.FitTrack.Service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping
    public Like createLike(@RequestBody Like like) {
        return likeService.saveLike(like);
    }

    @GetMapping
    public List<Like> getAllLikes() {
        return likeService.getAllLikes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Like> getLikeById(@PathVariable Integer id) {
        return likeService.getLikeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLike(@PathVariable Integer id) {
        if (likeService.getLikeById(id).isPresent()) {
            likeService.deleteLike(id);
            return ResponseEntity.ok("Like with ID " + id + " has been successfully deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
