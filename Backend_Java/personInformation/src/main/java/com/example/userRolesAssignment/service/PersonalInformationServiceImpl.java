package com.example.userRolesAssignment.service;

import com.example.userRolesAssignment.model.PersonalInformation;
import com.example.userRolesAssignment.model.User;
import com.example.userRolesAssignment.repository.PersonalInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonalInformationServiceImpl implements  PersonalInformationService{

    @Autowired
    PersonalInformationRepository personalInformationRepository;

    @Autowired
    UserService userService;
    @Override
    public void savePersonalInformation(PersonalInformation personalInformation,String updatedBy,String userName) {
        User user = userService.getUserByUsername(userName);
        if(updatedBy.equals("Admin")){
            user.setApproveRequest("N");
             personalInformation.setApproved(true);
              personalInformation.setSendRequestToAdmin(false);
            personalInformationRepository.save(personalInformation);
        }

        else{
            user.setApproveRequest("Y");
            personalInformation.setSendRequestToAdmin(true);
            personalInformation.setApproved(false);
            personalInformationRepository.save(personalInformation);

}
    }

    @Override
    public List <PersonalInformation> getPersonalInformation() {
        return (List<PersonalInformation>) personalInformationRepository.findAll();
    }

    @Override
    public void updateUser(PersonalInformation user) {
        personalInformationRepository.save(user);
    }

    @Override
    public PersonalInformation getUserByUsername(User username) {
     return    personalInformationRepository.getByUser(username);
    }
}
