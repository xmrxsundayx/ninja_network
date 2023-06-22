import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './components/Home';
import Friends from './components/Friends';
import Profile from './components/Profile';
import LoginRegistration from './components/LoginRegistration';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginRegistration />
        <Home />
        <Friends />
        <Profile />
      </header>
    </div>
  );
}

export default App;
