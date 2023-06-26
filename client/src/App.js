import './App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import Friends from './components/Friends';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import EditProfile from './components/EditProfile';
import Upload from './components/UploadTest';

function App() {
  const [user, setUser] = useState({});

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to="/login" />} path="/" />
          <Route element={<Login setUser={setUser}  />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Home user={user} setUser={setUser} />} path="/home/:id" />
          <Route element={<Friends user={user} setUser={setUser} />} path="/myninjas/:id" />
          <Route element={<Profile user={user} setUser={setUser} />} path="/profile/:id" />
          <Route element={<EditProfile user={user} setUser={setUser} />} path="/profile/:id/edit" />
          <Route element={<Upload user={user} setUser={setUser} />} path="/test" />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
