import React from 'react';
import './dashbord.css';
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import ensureArray from 'ensure-array';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import styled from 'styled-components';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Roles from '../Roles/Roles';
import DataTable from './Datatable/Datatable'
import PersonalInformation from '../PersonalInformation/personalInformation';
import UserProfile from '../UserProfile/userProfile';
const navWidthCollapsed = 64;
const navWidthExpanded = 280;
const NavHeader = styled.div`
    display: ${props => (props.expanded ? 'block' : 'none')};
    white-space: nowrap;
    background-color: #db3d44;
    color: #fff;

    > * {
        color: inherit;
        background-color: inherit;
    }
`;

// height: 20px + 10px + 10px = 40px
const NavTitle = styled.div`
    font-size: 2em;
    line-height: 20px;
    padding: 10px 0;
`;

const NavInfoPane = styled.div`
    float: left;
    width: 100%;
    padding: 10px 20px;
    background-color: #eee;
`;

const Separator = styled.div`
    clear: both;
    position: relative;
    margin: .8rem 0;
    background-color: #ddd;
    height: 1px;
`;

const Main = styled.main`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: ${navWidthCollapsed}px;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    background: ${props => (props.expanded ? 'rgba(0, 0, 0, .6)' : 'inherit')};
    transition: background-color .35s cubic-bezier(.4, 0, .2, 1);
`;
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        if(localStorage.getItem("userRole")=== "Admin"){
            this.state = {
                selected: 'Users/All Users',
                expanded: false,
                select: 'select'
            };
        }
        else{
            this.state = {
                selected: 'Personal Information',
                expanded: false,
                select: 'select'
            };
        } 
        this.handleChange=this.handleChange.bind(this);
        this.renderAllUsers=this.renderAllUsers.bind(this);
        this.renderPersonalInfo = this.renderPersonalInfo(this);
    }
  

    handleChange(e){
        this.setState({
          select: e.target.value
        })
      }
    
    lastUpdateTime = new Date().toISOString();
    onSelect = (selected) => {
        this.setState({ selected: selected });
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    pageTitle = {
        'Users/All Users': this.renderAllUsers('A'),
        'Users/Authorised': this.renderAllUsers("Y"),
        'Users/Unauthorised': this.renderAllUsers("N"),
        'Create Roles': this.renderRoleCreationForm(),
        'Create User':this.renderCreateUser(),
        'Personal Information':this.userProfile(),   
        'Update Information':this.renderPersonalInfo(),   
        'logout':this.logOut
    };

 
    renderBreadcrumbs() {
        
        const { selected } = this.state;
        const list = ensureArray(this.pageTitle[selected]);
            return (
            <Breadcrumbs>
                    {list.map((item, index) => (
                        <Breadcrumbs.Item
                            active={index === list.length - 1}
                            key={`${selected}_${index}`}
                        >
                            {item}
                        </Breadcrumbs.Item>
                    ))}
                </Breadcrumbs>
            );
    }
    render() {
        const { expanded, selected } = this.state;
        const userRole = localStorage.getItem("userRole");
        return (
            <div>
                <div className ="header">
                    <div className='header-icon'>
                    <label className="margin-left-100px"> {localStorage.getItem("username")}</label>
                    <i className="fa fa-fw fa-user "  style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                    </div>  
                </div>
                <SideNav
                    style={{ minWidth: expanded ? navWidthExpanded : navWidthCollapsed }}
                    onSelect={this.onSelect}
                    onToggle={this.onToggle}
                >
                    <Toggle />
                    <NavHeader expanded={expanded}>
                        <NavTitle>{localStorage.getItem("username") }</NavTitle>
                    </NavHeader>
                    {expanded &&
                    <NavInfoPane>
                      <div>User Role: {localStorage.getItem("userRole")}</div>
                    </NavInfoPane>
                    }
                    <Nav
                        defaultSelected={selected}
                    >
                          {
                            userRole==='Admin' ?(  
                          <NavItem eventKey="Users">
                            <NavIcon>
                                <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Users">
                                Users
                            </NavText>
                            <NavItem eventKey="Users/All Users">
                                <NavText title="All Users">
                                    All Users
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Users/Authorised">
                                <NavText title="Authorised">
                                    Authorised
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Users/Unauthorised">
                                <NavText title="Unauthorised">
                                    Unauthorised
                                </NavText>
                            </NavItem>
                        </NavItem>
                            ):<div></div>}  
                       
                        {
                            userRole==='Admin' || userRole==='Operator'?(  
                        <NavItem eventKey="Create User">
                            <NavIcon>
                                <i className="fa fa-fw fa-plus" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Create User">
                                Create User
                            </NavText>
                        </NavItem>
                         ):<div></div>
                    }
                       {
                            userRole==='Access User' || userRole==='Operator' ?(  
                        <NavItem eventKey="Personal Information">
                            <NavIcon>
                                <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Personal Information">
                                Personal Information
                            </NavText>
                        </NavItem>
                            ):<div></div>
                       }
                        {
                            userRole==='Access User' ?(  
                        <NavItem eventKey="Update Information">
                            <NavIcon>
                                <i className="fa fa-fw fa-plus" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Update Information">
                                Update Information
                            </NavText>
                        </NavItem>
                            ):<div></div>
                       }

                          {
                            userRole==='Admin' ?(  
                            <NavItem eventKey="Create Roles" userRole="Admin">
                            <NavIcon>
                                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="DEVICES">
                            create roles
                            </NavText>
                        </NavItem>
                        
                           
                        ):<div></div>
                        }
                     
                        <Separator />
                        <NavItem eventKey="logout">
                            <NavIcon>
                                <i className="fa fa-fw fa-power-off" style={{ fontSize: '1.5em' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="SIGN OUT">
                               <button className='button' onClick={() => { if (window.confirm('Are you sure you want to logout?')) this.logOut() } }> SIGN OUT</button>
                            </NavText>
                        </NavItem>
                    </Nav>
                </SideNav>
                <Main expanded={expanded}>
                    {this.renderBreadcrumbs()}
                </Main>
            </div>
        );
    }

    
    renderRoleCreationForm(){
        return(
            <Roles></Roles>
       )
    }
   

    renderAllUsers(auth){
        return(
            <DataTable isAuthorised = {auth}></DataTable>
        )
    }

    renderPersonalInfo(){
        return(
            <PersonalInformation></PersonalInformation>
        )
    }
    renderCreateUser(){
        return(
            <PersonalInformation></PersonalInformation>
        )
    }
   logOut(){
       localStorage.clear();
       return(   
       this.props.history.push('/')
       )
 
   }

   userProfile(){
       console.log("clicked")
       return(
<UserProfile></UserProfile>

       )
   }
}

export default Dashboard;