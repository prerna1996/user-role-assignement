import React from 'react';
import axios from 'axios';
let responseMessage="";

class Roles extends React.Component{  
    constructor(){
        super();
        this.state = {
            roleName: null,
            submitted: false,
            error:[]
          };
          this.handleChange= this.handleChange.bind(this);
          this.handleSubmit= this.handleSubmit.bind(this);
        }
        
        handleChange(e){
            const {name,value}= e.target;
            this.setState({[name] :value});
          };

        handleSubmit(e) {
            e.preventDefault();
            this.setState({
                submitted: true
            })
            const { roleName } = this.state;
            if (roleName) { 
                const data={
                    roleName:this.state.roleName
                }
                this.saveRoles(data)
            }
        }
    
    render(){
         const {roleName,submitted} = this.state;
         const error=this.state.error;
    return(
        <div className="wrapper1">
          <h1>Create Roles</h1>
                <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group'}>
                <label htmlFor="email" className="label">Role Name: </label>
               <input type="text" className={'form-control'  + (submitted && !roleName ? ' has-error' : '')} name="roleName"  onChange={this.handleChange} autocomplete="off" />
            {
                submitted && !roleName  &&
         <div className="help-block">Role Name is required</div>
             }
         </div>
         <div className="form-group">
         <button className="btn btn-primary" >Save</button> <label className='error'>{error}</label>
         </div>
         </form>
                <label>{responseMessage}</label>
            </div>
        
     )
}

saveRoles(data){
    console.log("Role name",data)
    axios.post('http://localhost:9096/roles',data).then(response=>{
        alert("Role"+data.roleName+"Added successfully")
    }).catch(error=>{
        this.setState({
            error:error.response.data
        })
    })
}
}
export default Roles;
