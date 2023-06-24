import './App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import Friends from './components/Friends';
import Profile from './components/Profile';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Navigate to="/login" />} path="/" />
          <Route element={<Login handleLogin={handleLogin} />} path="/login" />
          <Route element={<Register />} path="/register" />
          {isLoggedIn && (
            <>
              <Route element={<Home />} path="/home/:id" />
              <Route element={<Friends />} path="/myninjas/:id" />
              <Route element={<Profile />} path="/profile/:id" />
              {/* I took id off of profile until we can get some useParams in to capture the ID. */}
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<LoginRegistration />} />
//         <Route
//           path="/"
//           element={
//             <div>
//               <Navbar />
//               <div className="container">
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/myninjas" element={<Friends />} />
//                 <Route path="/profile/:id" element={<Profile />} />
//               </div>
//             </div>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;
