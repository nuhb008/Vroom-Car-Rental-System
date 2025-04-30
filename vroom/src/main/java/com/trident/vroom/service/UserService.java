package com.trident.vroom.service;

import com.trident.vroom.model.User;
import com.trident.vroom.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    public Optional<User> getUserById(int id) {
        return userRepository.getUserById(id);
    }

    public User createUser(User user) {
        userRepository.saveUser(user);
        return user;
    }

    public User updateUser(int id, User user) {
        Optional<User> existingUser = userRepository.getUserById(id);
        if (existingUser.isPresent()) {
            userRepository.updateUser(id, user);
            return user;
        } else {
            throw new RuntimeException("User not found with ID: " + id);
        }
    }

    public void deleteUser(int id) {
        userRepository.deleteUser(id);
    }

    public List<User> getHighestBookedCarByOwner(int UID) {
        return userRepository.getHighestBookedCarByOwner(UID);
    }
}
