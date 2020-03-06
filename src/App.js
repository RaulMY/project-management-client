// App.js

import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails';
import SignUp from './components/auth/SignUp';
import AuthService from './components/auth/auth-service';
import LogIn from './components/auth/LogIn';
import ProtectedRoute from './components/auth/protected-route';

const App = props => {

    const [ theUser, getTheUser ] = useState(null);
    const service = new AuthService();
  
    const fetchUser = () => {
      if( theUser === null ){
        service.loggedin()
        .then(response =>{
          getTheUser(response)
        })
        .catch( err =>{
          getTheUser(null)
        })
      }
    }

    fetchUser()
  
    if(theUser){
      return (
        <div className="App">
          <Navbar userInSession={theUser} getUser={getTheUser}/>
          <Switch>
            <ProtectedRoute user={theUser} path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute user={theUser} path='/projects' component={ProjectList} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={theUser} />
          <Switch>
            <Route exact path='/signup' render={() => <SignUp getUser={getTheUser}/>}/>
            <Route exact path='/' render={() => <LogIn getUser={getTheUser}/>}/>
            <ProtectedRoute user={theUser} path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute user={theUser} path='/projects' component={ProjectList} />
          </Switch>
        </div>
      );
    }
}

export default App;