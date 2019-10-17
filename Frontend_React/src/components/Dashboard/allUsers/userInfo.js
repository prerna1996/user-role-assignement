import React from 'react';
import {Datatable} from "@o2xp/react-datatable";
import { Link ,Redirect} from 'react-router-dom';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class UserInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            columnDefs: [
                {headerName: 'User ID', field: 'userId'},
                {headerName: 'Email', field: 'email'},
                {headerName: 'User Name', field: 'userName'},
                {headerName: 'Access', field: 'Access'},
                {headerName: 'Actions', field: 'Actions'}


            ],
            rowData: []
        }
        this.getAllUserInfo();
        console.log(this.state);
    }

    render(){
        console.log(this.state);
        return(
            <div
            className="ag-theme-balham"
            style={{ height: '200px', width: '600px' }}
        >
            <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}>
                        
            </AgGridReact>
        </div>
        
        )
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
}
export default UserInfo;