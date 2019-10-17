import React from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './user.css'

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            rowData: [],
            user:[]
        }
        this.getPersonalInfoByName();
        this.getUserInfoByName();
    }

  render() {
      console.log(this.state.rowData)
      const userItems= this.state.user.map(uitems=>{
          return(
            <table>
            <tr><td>ID</td><td>{uitems.userId}</td></tr>
                  <tr><td>Firsname</td><td>{uitems.userName}</td></tr>
                  <tr><td>Middle Name</td><td>{uitems.email}</td></tr>
                  </table>
          )
      })
    const items = this.state.rowData.map(item => {
        if(item){
            if(item.approved)
        return (
            <table>
      <tr>{item.userId}</tr>
            <tr><td>Firsname</td><td>{item.firstName}</td></tr>
            <tr><td>Middle Name</td><td>{item.middleName}</td></tr>
            <tr><td>Gender</td><td>{item.gender}</td></tr>
            <tr><td>Date Of Birth</td><td>{item.dateOfBirth}</td></tr>
            <tr><td>Age</td><td>{item.age}</td></tr>
            <tr><td>Bunglow No</td><td>{item.bunglowNo}</td></tr>
            <tr><td>Society Name</td><td>{item.societyName}</td></tr>
            <tr><td>Street Area Name</td><td>{item.streetAreaName}</td></tr>
            <tr><td>City</td><td>{item.city}</td></tr>
            <tr><td>State</td><td>{item.state}</td></tr>
            <tr><td>Pincode</td><td>{item.pinCode}</td></tr>
            <tr><td>Phone NO</td><td>{item.phoneNo}</td></tr>
            <tr><td>Mobile No</td><td>{item.mobileNo}</td></tr>
            <tr><td>Physically Disabled</td><td>{item.isPhysicallyDisabled}</td></tr>
            <tr><td>Marrital Status</td><td>{item.marritalStatus}</td></tr>
            <tr><td>Educational Status</td><td>{item.educationStatus}</td></tr>
            <tr><td>Birth Sign</td><td>{item.birthSign}</td></tr>
            </table>
      
          )
        }})
        return (
            <div>
                 <Table responsive hover className='background-color-white tableUser'>
                    <th>
                        User Information
                    </th>
                    <tbody>
                        {userItems}
                    </tbody>    
                    <br>
                    </br>
                    
                </Table>    
                  <Table responsive hover className='background-color-white tableUser'>
                  <th>
                        Personal Information
                    </th>
                  <tbody>
                      {items}
                  </tbody>    
                  <br>
                  </br>
                  
              </Table>    

            </div>
           
    )
        }
        getPersonalInfoByName(){
            let userName = localStorage.getItem("username");
            console.log(userName)
            axios.get('http://localhost:9096/personalInformation/'+userName).then(response=>{
                console.log(response.data)
                if(response.data){
                    this.setState({
                        rowData:response.data,
                          }         
                        );
                }
            
              }).catch(error =>{
    
          });
        }
        getUserInfoByName(){
            let userName = localStorage.getItem("username");
            console.log(userName)
            axios.get('http://localhost:9096/user/'+userName).then(response=>{
                console.log(response.data)
                if(response.data){
                    this.setState({
                        user:response.data,
                          }         
                        );
                }
            
              }).catch(error =>{
    
          });
        }
    

}
export default UserProfile;