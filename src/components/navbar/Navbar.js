// components/navbar/Navbar.js

import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';

const navbar = ({userInSession, getUser}) => {
    const service = new AuthService();

    const logoutUser = () =>{
        service.logout()
        .then(() => {
          getUser(null);  
        })
    }
    
    if (userInSession){
        return(
            <nav className="nav-style">
            <ul>
              <li>Welcome, {userInSession.username}</li>
              <li><Link to='/projects' style={{ textDecoration: 'none' }}>Projects</Link></li>
              <li>
                <Link to='/'>
                  <button onClick={() => logoutUser()}>Logout</button>
                </Link>
              </li>
            </ul>
          </nav>
        )
      } else {
        return (
          <div>
          <nav className="nav-style">
            <ul>
              <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
            </ul>
          </nav>
          </div>
        )
      }
}

export default navbar;