// auth/Login.js

import React, { useState } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

const LogIn = props => {
  const [ formState, updateFormState ] = useState (
    { username: '', password: '' }
  )
  const service = new AuthService()

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const username = formState.username;
    const password = formState.password;
    service.login(username, password)
    .then( response => {
        updateFormState({ username: "", password: "" });
        props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
    
  const handleChange = (event) => {  
    const {name, value} = event.target;
    updateFormState(Object.assign({}, formState, {[name]: value}));
  }
    
  
    return(
      <div>
        <form onSubmit={handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={formState.username} onChange={ e => handleChange(e)}/>
          <label>Password:</label>
          <input type="password" name="password" value={formState.password} onChange={ e => handleChange(e)} />
          
          <input type="submit" value="Login" />
        </form>
        <p>Don't have account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    )
  
}


export default LogIn;