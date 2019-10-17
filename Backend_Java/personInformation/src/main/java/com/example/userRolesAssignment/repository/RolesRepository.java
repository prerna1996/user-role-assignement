package com.example.userRolesAssignment.repository;

import java.util.Optional;

import com.example.userRolesAssignment.model.User;
import org.springframework.data.repository.CrudRepository;

import com.example.userRolesAssignment.model.Roles;

public interface RolesRepository extends CrudRepository<Roles, Integer> {

	Roles findByroleName(String roleName);
	Roles findByUser(User user);

}
