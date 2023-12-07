import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Nav from './components/Nav';
import CreateEvent from './components/CreateEvent'
import Dashboard from './components/Dashboard'
import EventDetails from './components/EventDetails'
import Payment from './components/Payment'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App(){

  return (
      <BrowserRouter>
        <Nav />

        <Routes>
        <Route path = '/' element={<Home />}></Route>
          <Route path = '/signup' element={<Registration />}></Route>
          <Route path = '/login' element={<Login />}></Route>
          <Route path = '/createevent' element={<CreateEvent />}></Route>
          <Route path = '/dashboard' element={<Dashboard />}></Route>
          <Route path = '/event_details/:eventId' element={<EventDetails />}></Route>
          <Route path = '/payment/:eventId' element={<Payment />}></Route>
        </Routes> 
      </BrowserRouter>
    
  )
}


export default App
