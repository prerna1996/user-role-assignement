	package com.example.userRolesAssignment.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import javax.validation.Valid;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.userRolesAssignment.model.User;
import com.example.userRolesAssignment.service.UserService;

@RestController
@CrossOrigin
public class UserController {
	@Autowired
	UserService userService;

	@PostMapping("/user/{createdBy}")
	public ResponseEntity<String> saveUser(@PathVariable String createdBy,@Valid @RequestBody User user){
		User username =  userService.getUserByUsername(user.getUserName());
		if(username != null){
			return new ResponseEntity<String>("User  Already Exist",HttpStatus.BAD_REQUEST);
		}
		else{
			userService.saveUserDetails(user,createdBy);
			return new ResponseEntity(user,HttpStatus.CREATED);
		}

	}

	@GetMapping("/user")
	public ResponseEntity<ArrayList <User>>getAllUsers(){
		ArrayList<User> user = (ArrayList<User>) userService.getAllUsers();
		ArrayList<HashMap<String, String>> userArrayList = new ArrayList<HashMap<String, String>>();

		for (int x=0; x<user.size(); x++) {
			HashMap<String, String> hashmap = new HashMap<String, String>();
			int id =user.get(x).getUserId();
			// Mapping string values to int keys
			hashmap.put("userName", user.get(x).getUserName());
			hashmap.put("userId", Integer.toString(id));
			hashmap.put("roleName",user.get(x).getRoles().getRoleName());
			hashmap.put("authorized",user.get(x).getIsAuthorised());
			hashmap.put("email",user.get(x).getEmail());
			hashmap.put("isRequestSent",user.get(x).getApproveRequest());
			userArrayList.add(x, hashmap);
		}
	//	ArrayList<User> user = (ArrayList<User>) userService.getAllUsers();
		return new ResponseEntity(userArrayList,HttpStatus.OK);
	}


	@GetMapping("/user/{userName}")
	List<User> getUserByName(@PathVariable String userName ){
		return Arrays.asList(userService.getUserByUsername(userName));
	}


	@GetMapping("/login/{username}/{password}")
	public  ResponseEntity<String> getUserByUsername (@PathVariable String username, @PathVariable String password) {
		User user =  userService.getUserByUsername(username);
		if(!user.getUserName().isEmpty()) {
			 if(user.getPassword().equals(password))
			{
				if(user.getIsAuthorised().equals("N")){
					return new ResponseEntity<String>("Error :Access Forbidden",HttpStatus.UNAUTHORIZED);
				}
				else{
					return new ResponseEntity<String>(user.getRoles().getRoleName(),HttpStatus.OK);
				}
			}
			else
				return new ResponseEntity<String>("Invalid Password",HttpStatus.UNAUTHORIZED);
		}
		else
			return new ResponseEntity<String>("User Not Found",HttpStatus.NOT_FOUND);
	}

	@PutMapping("/updateAccess")
	public ResponseEntity<String> updateAccess( @RequestBody User user) {
		User userDetails = userService.getUserByUsername(user.getUserName());
		if (userDetails != null) {
			userDetails.setIsAuthorised("Y");
			userService.updateUser(userDetails);
			return new ResponseEntity(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("User Not Found",HttpStatus.NOT_FOUND);
		}
		}

	@PutMapping("/deleteAccess")
	public ResponseEntity<String> deleteAccess( @RequestBody User user) {
		User userDetails = userService.getUserByUsername(user.getUserName());
		if (userDetails != null) {
			userDetails.setIsAuthorised("N");
			userService.updateUser(userDetails);
			return new ResponseEntity(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("User Not Found",HttpStatus.NOT_FOUND);
		}
	}

	}
