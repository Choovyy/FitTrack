package com.ProjectDev.FitTrack.Service;

import com.ProjectDev.FitTrack.Entity.User;
import com.ProjectDev.FitTrack.Repository.UserRepository; // Make sure to import your repository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Save a new user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    // Update user
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // Delete user
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    // Authenticate user
    public boolean authenticate(String email, String password) {
        User user = userRepository.findByEmail(email); // Implement this in your repository
        return user != null && user.getPassword().equals(password); // Consider using hashed passwords in production
    }
}
