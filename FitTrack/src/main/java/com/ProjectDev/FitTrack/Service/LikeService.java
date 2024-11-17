package com.ProjectDev.FitTrack.Service;

import com.ProjectDev.FitTrack.Entity.Like;
import com.ProjectDev.FitTrack.Repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    public List<Like> getAllLikes() {
        return likeRepository.findAll();
    }

    public Like getLikeById(Integer id) {
        return likeRepository.findById(id).orElse(null);
    }

    public Like saveLike(Like like) {
        return likeRepository.save(like);
    }

    public void deleteLike(Integer id) {
        likeRepository.deleteById(id);
    }
}
