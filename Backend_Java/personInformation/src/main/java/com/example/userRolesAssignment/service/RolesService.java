package com.example.userRolesAssignment.service;

import java.util.List;
import java.util.Optional;

import com.example.userRolesAssignment.model.Roles;
import com.example.userRolesAssignment.model.User;

public interface RolesService {
	 void addRoles(Roles roles);
	List <Roles> getAllRoles();
    public Optional<Roles> getRolesByRoleId(int roleID);
    public Roles getRolesByRoleName(String roleName);
    void updateUserRole(Roles user);
    public Roles getRolesByRoleUserName(User userName);


}
