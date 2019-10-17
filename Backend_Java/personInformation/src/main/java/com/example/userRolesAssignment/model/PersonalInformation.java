package com.example.userRolesAssignment.model;

import org.springframework.stereotype.Service;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class PersonalInformation {




@Id
@GeneratedValue
private  int pid;

    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private String  dateOfBirth;
    private String age;
    private String bunglowNo;
    private String  societyName;
    private String streetAreaName;
    private String city;
    private String state;
    private String  pinCode;
    private String  phoneNo;
    private String mobileNo;
    private String  isPhysicallyDisabled;
    private String  marritalStatus;
    private String   educationStatus;
    private String  birthSign;
    private Boolean approved;
    private Boolean sendRequestToAdmin;
    @OneToOne
    @JoinColumn(name = "userId")
    private User user;
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getBunglowNo() {
        return bunglowNo;
    }

    public void setBunglowNo(String bunglowNo) {
        this.bunglowNo = bunglowNo;
    }

    public String getSocietyName() {
        return societyName;
    }

    public void setSocietyName(String societyName) {
        this.societyName = societyName;
    }

    public String getStreetAreaName() {
        return streetAreaName;
    }

    public void setStreetAreaName(String streetAreaName) {
        this.streetAreaName = streetAreaName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getIsPhysicallyDisabled() {
        return isPhysicallyDisabled;
    }

    public void setIsPhysicallyDisabled(String isPhysicallyDisabled) {
        this.isPhysicallyDisabled = isPhysicallyDisabled;
    }

    public String getMarritalStatus() {
        return marritalStatus;
    }

    public void setMarritalStatus(String marritalStatus) {
        this.marritalStatus = marritalStatus;
    }

    public String getEducationStatus() {
        return educationStatus;
    }

    public void setEducationStatus(String educationStatus) {
        this.educationStatus = educationStatus;
    }

    public String getBirthSign() {
        return birthSign;
    }

    public void setBirthSign(String birthSign) {
        this.birthSign = birthSign;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public Boolean getSendRequestToAdmin() {
        return sendRequestToAdmin;
    }

    public void setSendRequestToAdmin(Boolean sendRequestToAdmin) {
        this.sendRequestToAdmin = sendRequestToAdmin;
    }
}
