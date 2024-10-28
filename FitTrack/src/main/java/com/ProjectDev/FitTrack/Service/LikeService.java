package com.ProjectDev.FitTrack.Service;

import com.ProjectDev.FitTrack.Entity.Like;
import com.ProjectDev.FitTrack.Repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public Like saveLike(Like like) {
        return likeRepository.save(like);
    }

    public List<Like> getAllLikes() {
        return likeRepository.findAll();
    }

    public Optional<Like> getLikeById(Integer id) {
        return likeRepository.findById(id);
    }

    public void deleteLike(Integer id) {
        likeRepository.deleteById(id);
    }
}
