package com.example.userRolesAssignment.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.userRolesAssignment.model.User;

public interface UserRepository extends CrudRepository<User, String>{
	//Optional<User> findByUserName(String userName);
	Optional <User> findByUserId(int userId);
	User findByUserName(String userName);

}
