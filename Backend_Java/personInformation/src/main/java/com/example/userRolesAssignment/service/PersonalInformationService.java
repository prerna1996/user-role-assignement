package com.example.userRolesAssignment.service;

import com.example.userRolesAssignment.model.PersonalInformation;
import com.example.userRolesAssignment.model.User;

import java.util.List;

public interface PersonalInformationService {
     void savePersonalInformation(PersonalInformation personalInformation,String updatedBy,String userName);
    List<PersonalInformation> getPersonalInformation();
    void updateUser(PersonalInformation user);
    PersonalInformation getUserByUsername(User username);


}
