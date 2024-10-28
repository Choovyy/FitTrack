package com.ProjectDev.FitTrack.Service;

import com.ProjectDev.FitTrack.Entity.User;
import com.ProjectDev.FitTrack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Create or Update a User
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Get all Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a User by ID
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    // Delete a User by ID
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}
