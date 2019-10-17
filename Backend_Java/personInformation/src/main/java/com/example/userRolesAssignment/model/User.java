package com.example.userRolesAssignment.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.org.apache.xpath.internal.operations.Bool;


@Entity
public class User {
				@Id    
				@GeneratedValue
				private int userId;

				private String userName;
				private String password;
				private String email;
				private String isAuthorised;
				private String approveRequest;

				@JsonIgnore
				@ManyToOne
				@JoinColumn(name="u_id")				
				private Roles roles;
				/**
				 * @return the userName
				 */
				public String getUserName() {
					return userName;
				}
				/**
				 * @param userName the userName to set
				 */
				public void setUserName(String userName) {
					this.userName = userName;
				}
				/**
				 * @return the password
				 */
				public String getPassword() {
					return password;
				}
				/**
				 * @param password the password to set
				 */
				public void setPassword(String password) {
					this.password = password;
				}
				/**
				 * @return the email
				 */
				public String getEmail() {
					return email;
				}
				/**
				 * @param email the email to set
				 */
				public void setEmail(String email) {
					this.email = email;
				}
				/**
				 * @return the userId
				 */
				public int getUserId() {
					return userId;
				}
				/**
				 * @param userId the userId to set
				 */
				public void setUserId(int userId) {
					this.userId = userId;
				}
				/**
				 * @return the roles
				 */
				public Roles getRoles() {
					return roles;
				}
				/**
				 * @param rolse the roles to set
				 */
				public void setRoles(Roles rolse) {
					this.roles = rolse;
				}

				public String getIsAuthorised() {
					return isAuthorised;
				}

					public void setIsAuthorised(String isAuthorised) {
					this.isAuthorised = isAuthorised;
						}

	public String getApproveRequest() {
		return approveRequest;
	}

	public void setApproveRequest(String approveRequest) {
		this.approveRequest = approveRequest;
	}
}
