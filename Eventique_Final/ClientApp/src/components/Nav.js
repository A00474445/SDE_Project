import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';

const Nav = () => {

  const navigate = useNavigate()


  const handleLogout = () => {
      
      window.localStorage.clear()
      axios.get("/api/User/logout")
        .then(result => navigate('/'))
        .catch(err => console.log(err))
      
  }

  return (
    <div>
      
        <Link to="/">Eventique</Link>
        <br />
        

        {
          window.localStorage.length ?
          <div>
            <Link to="/dashboard">Dashboard</Link>
            <br />
            <Link to="/createevent">Create Event</Link>
            <br />
            <Link onClick={handleLogout}>Logout</Link>
          </div>
          :
          <div>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/signup">Register</Link>
          </div>
        }
        
    </div>
  );
};

export default Nav;
