
import './App.css';
import React from 'react';
import Home from './components/Home';
import Friends from './components/Friends';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to="/login" />} path="/" />
          <Route element={<Login />} path='/login' />
          <Route element={<Register />} path='/register' />
          <>
          <Route element={<Home />} path='/home/:id' />
          <Route element={<Friends />} path='/myninjas' />
          <Route element={<Profile />} path='/profile/:id' />
          {/* I took id off of profile until we can get some useParams in to capture the ID.  */}
          </>
        </Routes>
      </BrowserRouter>
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
