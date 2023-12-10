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
    <header id="header">
    <div className="container d-flex align-items-center justify-content-between">

      <div className="logo">
        <h1><Link to="/">Eventique<span>.</span></Link></h1>
      </div>

      <nav id="navbar" className="navbar">
        {
          window.localStorage.length ?
            <ul>
              <li><Link className="nav-link scrollto" to="/dashboard">Dashboard</Link></li>
              <li><Link className="nav-link scrollto"to="/createevent">Create Event</Link></li>
              <li><Link className="nav-link scrollto" onClick={handleLogout}>Logout</Link></li>
            </ul>

          :
            <ul>
              <li><Link className="nav-link scrollto" to="/login">Login</Link></li>
              <li><Link className="nav-link scrollto"to="/signup">Register</Link></li>
            </ul>
        }

        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>
  );
};

export default Nav;
