package com.example.userRolesAssignment.controller;

import java.util.List;
import java.util.Optional;

import com.example.userRolesAssignment.model.User;
import com.example.userRolesAssignment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.userRolesAssignment.model.Roles;
import com.example.userRolesAssignment.service.RolesService;
import com.example.userRolesAssignment.service.RolesServiceImpl;

@RestController
@CrossOrigin
public class RolesController {
	
	@Autowired
	RolesService rolesService;
	@Autowired
	UserService userService;
	@PostMapping("/roles")
	public ResponseEntity<String> saveRoles(@RequestBody Roles roles){
		if(rolesService.getRolesByRoleName(roles.getRoleName()) != null) {
				return new ResponseEntity<String>("Role Already Present",HttpStatus.BAD_REQUEST);
			}
		rolesService.addRoles(roles);
		return new ResponseEntity<String>("Role added",HttpStatus.CREATED);
	}
	
	@GetMapping("/roles")
	List <Roles> getAllRoles(){
		return rolesService.getAllRoles();
	}

	@GetMapping("roles/{id}")
	Optional <Roles> getRolesById( @PathVariable int roleId ){
		return rolesService.getRolesByRoleId(roleId);
	}
	
	@GetMapping("getByRoleName/{roleName}")
	 Roles getRolesByName( @PathVariable String roleName ){
		System.out.println(roleName);
		return rolesService.getRolesByRoleName(roleName);
	}

	@PutMapping("updateUserRole/{userName}/{role}")
	public ResponseEntity<String> updateUserRole(@PathVariable String userName,@PathVariable String role){
		User user = userService.getUserByUsername(userName);
	user.setRoles(rolesService.getRolesByRoleName(role));
	userService.updateUser(user);
	return new ResponseEntity<String>("Role updated",HttpStatus.CREATED);

	}

	@GetMapping("getRoleByUserName/{userName}")
	String getRolesByUserName( @PathVariable String userName ){
		User user = userService.getUserByUsername(userName);
		return rolesService.getRolesByRoleUserName(user).getRoleName();
	}

}


