import React, { Component } from 'react'
import { Table,Button,Modal,ModalBody,ModalHeader } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select'
import UpdateUserInfo from './UpdateUserInfo'
import './datatable.css';


class DataTable extends Component {

    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            rowData: [],
            userUpdateInfo:[],
            allRoles:[],
            userName:"",
            approveForUserName:""
        }
        this.getAllUserInfo();
        this.toggle=this.toggle.bind(this);
        this.toggeUpdate=this.toggeUpdate.bind(this);
    }

    componentDidMount(){
      this.getAllUserInfo();
      this.selectRole();
    }
    toggle(userName) {
      console.log("================================"+userName)
      this.setState({
        modal: !this.state.modal,
        userName:userName
      });
    }

    toggeUpdate(userName){
      this.setState({
        updateModal: !this.state.updateModal,
        approveForUserName:userName
      });
     this.getPersonalInfoByName(userName);
    }
    updateUserRole(username,roleName){
      console.log("update")
     axios.put('http://localhost:9096/updateUserRole/'+username+"/"+roleName).then(response=>{
     console.log(response)
    })
    }
    
    selectRole(){
      axios.get('http://localhost:9096/roles').then(response =>{
        this.setState({
          allRoles:response.data,
       
        })
      })
    }
    handleChange = (roleName,selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption.value,roleName);
      this.updateUserRole(roleName,selectedOption.value);
      this.getAllUserInfo()

    }

    getAllUserInfo(){
        axios.get('http://localhost:9096/user').then(Response=>{
       console.log(this.state); 
       this.setState({
        rowData:Response.data
      }         
        );
          console.log(this.state);
      });
    }

  render() {
    let options=[];
    this.state.allRoles.map((item, i) => {
         options.push(
          { value: item.roleName, label: item.roleName},
         )
     
      }, this);
      console.log(this.props)
    const items = this.state.rowData.map(item => {
      if(this.props.isAuthorised === "A")
      {
      return (
          <tr key={item.userId}>     
          <td>{item.userId}</td>
          <td>{item.userName}</td>
          <td>{item.email}</td>
            <td>{item.authorized}</td>
            <td>{item.roleName}</td>
         <td>
            <Select options={options}  name="roleName" onChange={(e) => { if (window.confirm('Are you sure you want to change role for user '+item.userName)) this.handleChange(item.userName,e); this.getAllUserInfo()}}/>  
            </td>
          <td>  {
              item.authorized=== "N" ? (
              <Button color="success" onClick={() => this.giveAccess(item.userName)}>Give Access</Button>
           ):<div className="display-none"></div>
              }
              {
                    item.authorized=== "Y" ? (
                      <Button color="danger" onClick={() => this.deleteAccess(item.userName)}>Remove Access</Button>
           ):<div className="display-none"></div>
              }
        <Button color="success" onClick={()=>this.toggle(item.userName)}>Update Profile</Button>
    
          </td>
            { item.isRequestSent === "Y" ?(
              <td>
            <Button color="danger" onClick={() => this.toggeUpdate(item.userName)}>See Request</Button>
            </td>
            ):<td>No request</td> } 
          
        </tr>   
        )
    }
    else if(this.props.isAuthorised === "N")
    {
    if(item.authorized === "N"){

      return(
      <tr key={item.userId}>      
      <td>{item.userId}</td>
      <td>{item.userName}</td>
      <td>{item.email}</td>
     <td>{item.authorized}</td>
     <td>{item.roleName}</td>
     <td>
        <Select options={options}  name="roleName" onChange={(e) => { if (window.confirm('Are you sure you want to change role for user '+item.userName)) this.handleChange(item.userName,e); this.getAllUserInfo()}}/>  
        </td>
          <td>
         <Button color="success" onClick={() => this.giveAccess(item.userName)}>Give Access</Button>
         <Button color="success" onClick={()=>this.toggle(item.userName)}>Update Profile</Button>
        </td>  
          
      { item.isRequestSent === "Y" ?(
        <td>
      <Button color="danger" onClick={() => this.toggeUpdate(item.userName)}>See Request</Button>
      </td>
      ):<td>No request</td> }        
    </tr>     
      )}
    }
    else if(this.props.isAuthorised === "Y")
    if(item.authorized === "Y"){
    {
      return(
      <tr key={item.userId}>      
      <td>{item.userId}</td>
      <td>{item.userName}</td>
      <td>{item.email}</td>
     <td>{item.authorized}</td>
     <td>{item.roleName}</td>
     <td>
        <Select options={options}  name="roleName" onChange={(e) => { if (window.confirm('Are you sure you want to change role for user '+item.userName)) this.handleChange(item.userName,e); this.getAllUserInfo()}}/>  
        </td>
          <td>
        <Button color="danger" onClick={() => this.deleteAccess(item.userName)}>Remove Access</Button>
        <Button color="success" onClick={()=>this.toggle(item.userName)}>Update Profile</Button>
        </td>  
        { item.isRequestSent === "Y" ?(
        <td>
      <Button color="danger" onClick={() => this.toggeUpdate(item.userName)}>See Request</Button>
      </td>
      ):<td>No request</td> } 
    </tr>   
      )}
    }
 })
      

    return (
      <Table responsive hover className='background-color-white'>
        <thead>
          <tr>  
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Authorization</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Actions</th>
            <th>User Request</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
        <Modal isOpen={this.state.modal}>
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>
            <div>
            <label>Update information for user </label>
          <Button color="danger" className="float-right" onClick={this.toggle}><i class="fa fa-close"/></Button>
          </div>
          </ModalHeader>
          <ModalBody>
            <UpdateUserInfo username={this.state.userName}></UpdateUserInfo>
          </ModalBody>  
          </form>
        </Modal>
        <Modal isOpen={this.state.updateModal}>
          <ModalHeader>{this.state.approveForUserName} Updated personal information
          <Button color="danger" onClick={this.toggeUpdate}>Cancel</Button>
          <Button color="success" onClick={this.approveRequest(this.state.approveForUserName)}>approve</Button>
          </ModalHeader>
          <ModalBody>
            {this.showUpdatedInfo()}
          </ModalBody>
        
        </Modal>
      </Table>
    )
  }

  deleteAccess(username){
    const data={  
        userName:username
    }
    axios.put("http://localhost:9096/deleteAccess",data).then(response=>{
        console.log(response)
        this.getAllUserInfo();
        alert("Access removed for user"+username);
    })
}

giveAccess(username){
  const data={  
      userName:username
  }
  axios.put("http://localhost:9096/updateAccess",data).then(response=>{
      this.getAllUserInfo();
      alert("Access Given to User "+username);
  }).catch(error =>{
    if(error.response){
      alert("Error"+error.response.data);
    }
  })

}

showUpdatedInfo(){
    console.log(this.state.userUpdateInfo)
    const items = this.state.userUpdateInfo.map(item => {
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
        })
        return (
            <Table responsive hover className='background-color-white'>
                <tbody>
                {items}
                </tbody>          
            </Table>    
  )
}

getPersonalInfoByName(userName){
  console.log(userName)
  axios.get('http://localhost:9096/personalInformation/'+userName).then(response=>{
      console.log(response.data)
      if(response.data){
          this.setState({
            userUpdateInfo:response.data,
                }         
              );
      }
  
    }).catch(error =>{

});
}
approveRequest(userName){
  console.log(userName)
  axios.put("http://localhost:9096/approveUpdateRequest/"+userName).then(response =>{
    console.log(response);
    if (window.confirm('Request approved successfully')) this.routeToDashBoard() 

  })
}

routeToDashBoard(){
  this.props.history.push("/dashboard");

}
}
export default DataTable