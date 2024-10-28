package com.ProjectDev.FitTrack.Repository;

import com.ProjectDev.FitTrack.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Additional query methods (if needed) can be defined here
}
