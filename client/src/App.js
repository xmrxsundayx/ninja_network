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
import Posts from './components/Posts';
import EditPost from './components/EditPost'

function App() {
  const [user, setUser] = useState({});
  const [postList, setPostList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to="/login" />} path="/" />
          <Route element={<Login setUser={setUser} />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Home selectedUser={selectedUser} setSelectedUser={setSelectedUser} user={user} setUser={setUser} postList={postList} setPostList={setPostList}/>} path="/home/:id" />
          <Route element={<Friends selectedUser={selectedUser} setSelectedUser={setSelectedUser} user={user} setUser={setUser} />} path="/myninjas/:id" />
          <Route element={<Profile selectedUser={selectedUser} setSelectedUser={setSelectedUser} user={user} setUser={setUser} postList={postList} setPostList={setPostList}/>} path="/profile/:id" />
          <Route element={<EditProfile user={user} setUser={setUser} />} path="/profile/:id/edit" />
          <Route element={<EditPost user={user} setUser={setUser} />} path="/post/:id/edit" />
          <Route element={
            <div>
              <Upload user={user} setUser={setUser} postList={postList} setPostList={setPostList} /><Posts user={user} setUser={setUser} postList={postList} setPostList={setPostList} />
            </div>
          } path="/test" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
