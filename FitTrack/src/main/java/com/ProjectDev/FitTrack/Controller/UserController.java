package com.ProjectDev.FitTrack.Controller;

import com.ProjectDev.FitTrack.Entity.User;
import com.ProjectDev.FitTrack.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Frontend URL for CORS
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new User
    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody User user) {
    if (userService.emailExists(user.getEmail())) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
    }

    User savedUser = userService.saveUser(user);

    // Return a response with the user ID
    return ResponseEntity.status(HttpStatus.CREATED).body(
        new ResponseMessage("User registered successfully with ID: " + savedUser.getUserID())
    );
}


@PostMapping("/login")
public ResponseEntity<Object> login(@RequestBody User loginRequest) {
    String email = loginRequest.getEmail();
    String password = loginRequest.getPassword();
    
    // Authenticate user
    boolean isAuthenticated = userService.authenticate(email, password);
    
    if (isAuthenticated) {
        // Retrieve the authenticated user by email
        User authenticatedUser = userService.findByEmail(email);
        
        // Ensure the user exists and return the User ID in a ResponseMessage object
        if (authenticatedUser != null) {
            return ResponseEntity.ok(new ResponseMessage("Login successful! Welcome, your UserID is: " + authenticatedUser.getUserID()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseMessage("Invalid credentials"));
        }
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseMessage("Invalid credentials"));
    }
}

    

    // Get all Users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Get User by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Integer id) {
        Optional<User> user = userService.getUserById(id);
        
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // Update User
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
        Optional<User> userOptional = userService.getUserById(id);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword()); // Encrypt password if needed
            userService.saveUser(user);
            return ResponseEntity.ok("User updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // Delete User
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Integer id) {
        Optional<User> userOptional = userService.getUserById(id);
        
        if (userOptional.isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // Other methods...
}
