import React from 'react';
import {  Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import LoginPage from './components/Login/LoginPage';
import RegistrationPage from './components/Registration/RegistrationPage';
import Dashboard from './components/Dashboard/Dashboard';
import { history } from './_helpers/history';

var data = "role";
function App() {
  return (
                           <Router history={history} data={data}>
                            <div>          
                                 <Route path="/" exact component={LoginPage} ></Route>     
                                <Route path="/registration" exact component={RegistrationPage} />
                                <Route path= "/dashboard" component= {Dashboard}></Route>
                            </div>
                        </Router>
  );
}
 
export default App;
