import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import axios from 'axios';

class LoginPage extends React.Component{

constructor(props){
    super();
    this.state = {
        username : "",
        password : "",
        submitted: false,
        error: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
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
    const { username, password } = this.state;

    if (username && password) {
        axios.get('http://localhost:9096/login/'+username+'/'+password)
        .then(response =>{
            localStorage.setItem("username",username);
            localStorage.setItem("userRole",response.data);
            if (window.confirm('You have Logged in Successfully')) this.routeToDashBoard() 
        }).catch(error=>{
            console.log(error.response.data.error)
            if(error.response.data.error)
            {   
                 this.setState({
                error:error.response.data.error
            })
               
            }
            else if(error.response.data){
                this.setState({
                    error:error.response.data
                })

            }
            else{
                this.setState({
                    error:"Wrong Credentials"
                })
            
            }
               
            console.log((error.response.data));
        });      
    }
    
}

routeToDashBoard(){
    this.props.history.push("/dashboard");

}

    render(){   
        const { username, password, submitted } = this.state;
        console.log(this.state.error.data);
        var error=this.state.error;
        return(
            <div className="wrapper">
        <div className="login-form-wrapper">
          <h1>Login</h1>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' }>
                        <label htmlFor="username" className= "bold">Username</label>
                        <input type="text" className={'form-control' + (submitted && !username ? ' has-error' : '')} name="username" value={username} onChange={this.handleChange}  />
                        {
                            submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' }>
                        <label htmlFor="password" className="bold">Password</label>
                        <input type="password" className={'form-control' + (submitted && !password ? ' has-error' : '')} name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <label className='error'>{error} </label>
                  
                    <div className="form-group">    
                        <button className="btn btn-primary" >Login</button>
                       
                        <Link to="/registration" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
            </div>
        );
    }


   
}




export default LoginPage;

