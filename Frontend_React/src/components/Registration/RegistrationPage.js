import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './registration.css'
import service from '../../Validation/service';

class RegistrationPage extends React.Component{
   
    constructor(props){
        super(props);    
        this.state={
            userName:"",
            password:"",
            email    :"",
            submitted: false,
            response:[],
            error:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }
    routeChange() {
        let path = `/`;
        this.props.history.push(path);
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
        const { userName, password, email } = this.state;
        if (service.validateString(userName) && service.validateString(password) && service.validateEmail(email)) { 
            this.saveUser(this.state);
            console.log(this.state);
        }
        
    }

    render(){
        const { userName, password, email, submitted } = this.state;
        var error=this.state.error.data;

        return(
   <div className="wrapper">
   <div className="form-wrapper">
      <h1 >Sign Up</h1>
      <form name="form" onSubmit={this.handleSubmit}>
         <div className={'form-group' }>
            <label htmlFor="username" className="label">Username</label>
            <input type="text" className={'form-control'  + (submitted && !service.validateString(userName) ? ' has-error' : '')} name="userName" onChange={this.handleChange}  />
            {
                submitted && !service.validateString(userName) &&
         <div className="help-block">Length should be more than 6 characters.</div>
             }
         </div>
         <div className={'form-group'}>
            <label htmlFor="email" className="label">Email</label>
            <input type="text" className={'form-control'  + (submitted && !service.validateEmail(email) ? ' has-error' : '')} name="email"  onChange={this.handleChange} />
            {
                submitted && !service.validateEmail(email)  &&
         <div className="help-block">Invalid Email</div>
             }
         </div>
         <div className={'form-group'}>
            <label htmlFor="password" className="label">Password</label>
            <input type="password" className={'form-control'  + (submitted && !service.validateString(password) ? ' has-error' : '')} name="password" onChange={this.handleChange}   />
            {
                submitted && !service.validateString(password) &&
         <div className="help-block">Password should be more than 6 characters.</div>
             }
         </div>

         <div className="form-group">
            <button className="btn btn-primary" >Register</button>  
            <button className="btn btn-success" onClick={this.routeChange}>Login </button>

            <Link to="/" className="btn btn-link">
            cancel</Link>
            <label className='error'>{error}</label>

         </div> 
      </form>

   </div>
</div>
   );
    }


    saveUser(data){
        axios.post('http://localhost:9096/user/Access User',data)
        .then(response =>{
            console.log(response);
            this.props.history.push("/");
    
        }).catch(error=>{
            this.setState({
                error:error.response
            })
            console.log(error.response)
        })
       }    
}




export default RegistrationPage;