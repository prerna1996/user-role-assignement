import React from 'react';
import axios from 'axios';

class UpdateUserInfo extends React.Component{
    constructor (props){
    super(props);
    this.state={
                firstName:"",
                middleName:"",
                lastName:"",
                gender:"",
                dateOfBirth:"",
                age: "",
                bunglowNo:"",
                societyName:"",
                streetAreaName:"",
                city:"",
                state:"",
                pinCode:"",
                phoneNo: "",
                mobileNo:"",
                isPhysicallyDisabled:"",
                marritalStatus:"",
                educationStatus:"",
                birthSign:"",
                submitted:false,
                updatePersonal:false,
                updateSubmitted:false
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.savePersonalInfo=this.savePersonalInfo.bind(this);
    }

    handleChange(e){
      const {name,value}= e.target;
      this.setState({[name] :value});
   }
  
  handleSubmit(e) {
      e.preventDefault();
      this.setState({
          submitted: true
      })
      const {firstName, middleName, lastName ,gender,age} = this.state;
         if(firstName && lastName && middleName && gender && age)
            {
            this.savePersonalInfo(this.state,this.props.username);
         }     
  }
  savePersonalInfo(data,username){
     const userRole = localStorage.getItem("userRole")
     axios.put('http://localhost:9096/personalInformation/'+username+"/"+userRole,data).then(response =>{
        alert("Personal information updated for user "+username);
     }).catch(error=>{
        console.log(error.response);
     })
  }

  

    render(){
       console.log(this.props)
      const {confirmPassword,password,submitted, firstName, middleName, lastName ,dateOfBirth,age,city,state,pinCode,phoneNo,mobileNo,isPhysicallyDisabled} = this.state;
        return(
         <div className="wrapperRegister">
         <div className="form-wrapper1">
            <form name="form" onSubmit={this.handleSubmit}>
               <div className= {'full-name'}>
                  <div> <label className = {'bold'}>Full Name</label></div>
                  <div className="form-group width-200px">
                     <label htmlFor="firstname">First Name</label>
                     <input type="text" className={'form-control'  + (submitted && !firstName ? ' has-error' : '')} name="firstName"  onChange={this.handleChange} />
                     {
                       submitted && !firstName &&
                       <div className="help-block">First name is required</div>
                     }
                  </div>
                  <div className="form-group width-200px">
                     <label htmlFor="middlename">Middle Name</label>
                     <input type="text" className={'form-control'  + (submitted && !middleName ? ' has-error' : '')} name="middleName"  onChange={this.handleChange}  />
                     {
                       submitted && !middleName &&
                       <div className="help-block">Middle name is required</div>
                     }
                  </div>
                  <div className="form-group width-200px">
                     <label htmlFor="lastname">Last Name</label>
                     <input type="text" className={'form-control'  + (submitted && !lastName ? ' has-error' : '')} name="lastName"  onChange={this.handleChange} />
                     {
                       submitted && !lastName &&
                       <div className="help-block">Last name is required</div>
                     }
                  </div>
               </div>
               <div className= {'full-name'}>
                  <div className="form-group width-200px">
                     <label htmlFor="sel1">Gender:</label>
                     <select className="form-control" id="sel1"  name="gender" onChange={this.handleChange}>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                        <option>Rather not Say</option>
                     </select>
                  </div>
                  <div className="form-group width-200px">
                     <label htmlFor="dateofbirth">Date Of Birth</label>
                     <input type="text" className={'form-control'  + (submitted && !dateOfBirth ? ' has-error' : '')} name="dateOfBirth"  onChange={this.handleChange} />
                     {
                       submitted && !dateOfBirth &&
                       <div className="help-block">Date Of Birth is required</div>
                     }
                  </div>
                  <div className="form-group width-200px">
                     <label htmlFor="age">Age</label>
                     <input type="text" className={'form-control'  + (submitted && !age ? ' has-error' : '')} name="age"  onChange={this.handleChange}  />
                     {
                       submitted && !age &&
                       <div className="help-block">Age is required</div>
                     }
                  </div>
               </div>
               <div className= {'full-name'}>
                  <div> <label className = {'bold'}>Address</label></div>
                  <div className="form-group width-200px">
                     <label htmlFor="bunglowno">Bunglow NO</label>
                     <input type="text" className="form-control" name="bunglowNo"  onChange={this.handleChange} />
                  
                  </div>
                  <div className={'form-group','width-200px'}>
                     <label htmlFor="societyname">Society Name</label>
                     <input type="text" className="form-control" name="societyName"  onChange={this.handleChange}  />
                   
                  </div>
                  <div className="form-group width-200px">
                     <label htmlFor="streetAreaName">Street Area Name:</label>
                     <input type="text" className="form-group" name="streetAreaName"  onChange={this.handleChange} />
                  </div>
               </div>
               <div className= {'full-name'}>
                  <div className="form-group width-200px">
                     <label htmlFor="city">City</label>
                     <input type="text" className={'form-control'  + (submitted && !city ? ' has-error' : '')} name="city"  onChange={this.handleChange} />
                  </div>
                  <div className="form-group width-200px">
                     <label htmlFor="state">State</label>
                     <input type="text" className={'form-control'  + (submitted && !state ? ' has-error' : '')} name="state"  onChange={this.handleChange} />
                  </div>
                  <div className="form-group width-200px">
                     <label htmlFor="pincode">Pin code</label>
                     <input type="text" className={'form-control'  + (submitted && !pinCode ? ' has-error' : '')} name="pinCode"  onChange={this.handleChange} />
                  </div>
               </div>
               <div className= {'full-name'}>
                  <div className="form-group width-200px">
                     <label htmlFor="phoneNo">Phone NO</label>
                     <input type="text" className={'form-control'  + (submitted && !phoneNo ? ' has-error' : '')} name="phoneNo"  onChange={this.handleChange} />
                  </div>
                  <div className="form-group width-200px">
                     <label htmlFor="mobileNo">Mobile No</label>
                     <input type="text" className={'form-control'  + (submitted && !mobileNo ? ' has-error' : '')} name="mobileNo"  onChange={this.handleChange} />
                  </div>
                  <div className="form-group width-200px">
                     <label htmlFor="isHandicapped">Is Handicapped</label>
                     <input type="text" className={'form-control'  + (submitted && !isPhysicallyDisabled ? ' has-error' : '')} name="isPhysicallyDisabled"  onChange={this.handleChange} />
                  </div>
               </div>
               <div className="form-group width-200px">
                  <label htmlFor="sel1">Marrrital Status:</label>
                  <select className="form-control" id="sel1" name="marritalStatus" onChange={this.handleChange}>
                     <option>Married </option>
                     <option>Unmarried</option>
                     <option>Divorced</option>
                     <option>Widow</option>
                     <option>Widower</option>
                  </select>
               </div>
               <div className="form-group width-200px">
                  <label htmlFor="sel1">Educational Status:</label>
                  <select className="form-control" id="sel1" name="educationStatus" onChange={this.handleChange}>
                     <option>Master's </option>
                     <option>Phd</option>
                     <option>Graduate</option>
                     <option>Under Graduate</option>
                     <option>HSC</option>
                     <option>SSC</option>
                  </select>
               </div>
               <div className="form-group width-200px">
                  <label htmlFor="password">Password</label>
                  <input type="password" className={'form-control'  + (submitted && !isPhysicallyDisabled ? ' has-error' : '')} name="password"  onChange={this.handleChange}/>
                       {
                       submitted && !password &&
                       <div className="help-block">password is required</div>
                     }
               </div>
               <div className="form-group width-200px">
                  <label htmlFor="password">Confirm Password</label>
                  <input type="password" className={'form-control'  + (submitted && !isPhysicallyDisabled ? ' has-error' : '')}  name="confirmPassword"  onChange={this.handleChange}/>
                  {
                       submitted && !confirmPassword &&
                       <div className="help-block">confirm password is required</div>
                     }
               </div>
               <div className="full-name">
                  <div className="form-group width-200px register-button">
                     <button  className="btn btn-primary" >Save</button>
                
                  </div>
               </div>
            </form>
         </div>
      </div>
        )
    }
    
    register(){
   this.setState({
      updateSubmitted: true,  

  })
  console.log(this.state)
  const { userName, password, email } = this.state;
  if (userName && password && email ) { 
   axios.post('http://localhost:9096/user',this.state)
        .then(response =>{
            console.log(response);
            this.setState({
               updatePersonal:true
            })
            localStorage.setItem("recentlyCreatedUser",userName);
    
        }).catch(error=>{
            this.setState({
                error:error.response
            })
            console.log(error.response)
        })
      }
}
    

}
export default UpdateUserInfo;