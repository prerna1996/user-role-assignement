package com.example.userRolesAssignment.repository;

import com.example.userRolesAssignment.model.PersonalInformation;
import com.example.userRolesAssignment.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PersonalInformationRepository extends CrudRepository<PersonalInformation,String> {
PersonalInformation getByUser(User firstName);
}
