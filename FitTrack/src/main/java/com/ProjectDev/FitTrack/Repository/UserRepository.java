package com.ProjectDev.FitTrack.Repository;

import com.ProjectDev.FitTrack.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email); // Method to find user by email
}
