package com.example.userRolesAssignment.service;

import java.util.List;
import java.util.Optional;

import com.example.userRolesAssignment.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.userRolesAssignment.model.Roles;
import com.example.userRolesAssignment.repository.RolesRepository;

@Service
public class RolesServiceImpl implements RolesService{
		
	@Autowired
	RolesRepository rolesRepository;
	
	@Override
	public void addRoles(Roles roles) {
		rolesRepository.save(roles);
	}


	@Override
	public List<Roles> getAllRoles() {
		return (List<Roles>) rolesRepository.findAll();
	}


	@Override
	public Optional<Roles> getRolesByRoleId(int roleID) {
		return rolesRepository.findById(roleID);
	}

	@Override
	public Roles getRolesByRoleName(String roleName) {
	return rolesRepository.findByroleName(roleName);
	}

	@Override
	public void updateUserRole(Roles user) {
		rolesRepository.save(user);
	}

	@Override
	public Roles getRolesByRoleUserName(User user) {
		return rolesRepository.findByUser(user);
	}
}
