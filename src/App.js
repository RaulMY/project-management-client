// App.js

import React, { useState, Fragment } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';
import SignUp from './components/auth/SignUp';
import AuthService from './components/auth/auth-service';
import LogIn from './components/auth/LogIn';
import ProtectedRoute from './components/auth/protected-route';
import MyContext from './context';

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
  
    return (
        <MyContext.Provider value={{user: theUser, updateContext: getTheUser}}>
          <div className="App">
            <Navbar/>
            <Switch>

                  <Fragment>
                    <Route exact path='/signup' render={() => <SignUp/>}/>
                    <Route exact path='/' render={() => <LogIn/>}/>
                  </Fragment>
                <ProtectedRoute path='/projects/:id' component={ProjectDetails} />
                <ProtectedRoute path='/projects' component={ProjectList} />
            </Switch>
          </div>
        </MyContext.Provider>
      );
    
}

export default App;