package com.example.userRolesAssignment.controller;

import com.example.userRolesAssignment.model.PersonalInformation;
import com.example.userRolesAssignment.model.User;
import com.example.userRolesAssignment.service.PersonalInformationService;
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
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin
public class PersonalInformationController {

    @Autowired
    PersonalInformationService personalInformationService;
    @Autowired
    UserService userService;

    @PostMapping("/personalInformation/{username}")
    public ResponseEntity<String> saveUser(@Valid @RequestBody PersonalInformation personalInformation, @PathVariable String username,@PathVariable String updatedBy) {
        User user = userService.getUserByUsername(username);
        if (username != null) {
            user.setApproveRequest("Y");
            personalInformation.setUser(user);
            personalInformationService.savePersonalInformation(personalInformation,updatedBy,username);
            return new ResponseEntity<String>("Personal Information Added", HttpStatus.OK);
        } else {
            return new ResponseEntity(user, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/personalInformation/{userName}/{updatedBy}")
    public ResponseEntity<String> updateUser( @PathVariable String userName,@PathVariable String updatedBy,@Valid @RequestBody PersonalInformation personalInformation) {
        User user = userService.getUserByUsername(userName);
        PersonalInformation personalInformation1 = personalInformationService.getUserByUsername(user);
        if (user != null && personalInformation1==null) {
            personalInformation.setUser(user);
            personalInformationService.savePersonalInformation(personalInformation,updatedBy,userName);
            return new ResponseEntity<String>("Personal Information Added", HttpStatus.OK);
        }else  if(user !=null && personalInformation1!=null){
            personalInformation1.setUser(user);
            personalInformation1.setAge(personalInformation.getAge());
            personalInformation1.setBirthSign(personalInformation.getBirthSign());
            personalInformation1.setBunglowNo(personalInformation.getBunglowNo());
            personalInformation1.setCity(personalInformation.getCity());
            personalInformation1.setEducationStatus(personalInformation.getEducationStatus());
            personalInformation1.setFirstName(personalInformation.getFirstName());
            personalInformation1.setLastName(personalInformation.getLastName());
            personalInformationService.savePersonalInformation(personalInformation1,updatedBy,userName);
            return new ResponseEntity<String>("Personal Information update", HttpStatus.OK);
        }
        return new ResponseEntity<String>("Personal Information Added", HttpStatus.OK);

    }

    @GetMapping("personalInformation/{userName}")
 List<PersonalInformation>  getByUerId(@PathVariable String userName){
        User user =userService.getUserByUsername(userName);
    PersonalInformation personalInformation= personalInformationService.getUserByUsername(user);
        return Arrays.asList(personalInformation);
    }


        @GetMapping("/personalInfo")
        List <PersonalInformation> getAllRoles(){
            return personalInformationService.getPersonalInformation();
        }

        @PutMapping("approveUpdateRequest/{userName}")
      void  approveUpdateRequest(@PathVariable String userName){
       User user = userService.getUserByUsername(userName);
       user.setApproveRequest("N");
        PersonalInformation personalInformation = personalInformationService.getUserByUsername(user);
        personalInformation.setApproved(true);
        personalInformationService.savePersonalInformation(personalInformation,"Admin",userName);

        }
}
