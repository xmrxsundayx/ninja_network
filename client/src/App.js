import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './components/Home';
import Friends from './components/Friends';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import LoginRegistration from './components/LoginRegistration';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginRegistration />} />
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <div className="container">
                <Route path="/home" element={<Home />} />
                <Route path="/myninjas" element={<Friends />} />
                <Route path="/profile/:id" element={<Profile />} />
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
