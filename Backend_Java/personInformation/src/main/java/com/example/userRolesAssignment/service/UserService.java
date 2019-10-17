package com.example.userRolesAssignment.service;

import java.util.List;
import java.util.Optional;

import com.example.userRolesAssignment.model.User;

public interface UserService {

	void saveUserDetails(User user,String createdBy);
	List<User> getAllUsers();
	User getUserByUsername(String username);

	void updateUser(User user);

}
