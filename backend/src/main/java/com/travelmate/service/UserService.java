package com.travelmate.service;

import com.travelmate.entity.User;
import com.travelmate.exception.ResourceNotFoundException;
import com.travelmate.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
    }

    @Transactional
    public User updateUser(Long id, User updateDetails) {
        User user = getUserById(id);
        if (updateDetails.getFullName() != null) {
            user.setFullName(updateDetails.getFullName());
        }
        if (updateDetails.getPhone() != null) {
            user.setPhone(updateDetails.getPhone());
        }
        if (updateDetails.getAddress() != null) {
            user.setAddress(updateDetails.getAddress());
        }
        if (updateDetails.getAvatarUrl() != null) {
            user.setAvatarUrl(updateDetails.getAvatarUrl());
        }
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
