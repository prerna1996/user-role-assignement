package com.example.userRolesAssignment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.userRolesAssignment.model.Roles;
import com.example.userRolesAssignment.model.User;
import com.example.userRolesAssignment.repository.UserRepository;
@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired 
	RolesService roleService;
	
	@Override
	public void saveUserDetails(User user,String createdBy) {

	Optional<Roles> roleOptional = roleService.getRolesByRoleId(2222);
	User userOptional = getUserByUsername(user.getUserName());
		user.setRoles(roleOptional.get());
		user.setApproveRequest("N");
		if(createdBy.equals("Admin")) {
			user.setIsAuthorised("Y");
			userRepository.save(user);
		}
		else{
			user.setIsAuthorised("N");
			userRepository.save(user);

		}
	}

	@Override
	public List<User> getAllUsers() {
		return (List<User>) userRepository.findAll();
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepository.findByUserName(username);
	}

	@Override
	public void updateUser(User user) {
		userRepository.save(user);
	}

}
