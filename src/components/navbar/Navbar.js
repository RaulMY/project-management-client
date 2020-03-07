// components/navbar/Navbar.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';
import MyContext from '../../context';


const NavBar = () => {
    const service = new AuthService();

    const { user, updateUser } = useContext(MyContext);
  
    const logoutUser = () =>{
        service.logout()
        .then(() => {
          updateUser(null);  
        })
    }
    
    if (user){
      return(
          <nav className="nav-style">
          <ul>
            <li>Welcome, {user.username}</li>
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

export default NavBar;