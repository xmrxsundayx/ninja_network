// Khrista's component
import React, { useState } from 'react'
import bgVd from '../images/bgVid.mp4'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import whiteLogo from '../images/logoWhite.png'

const Login = ({ user, setUser }) => {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();


  const handleChangeLogin = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', userLogin, { withCredentials: true })
      .then(res => {
        console.log(res);
        console.log("this is data user", res.data.user);
        console.log("this is the ID", res.data.user._id);
        setUser(res.data.user);
        navigate(`/home/${res.data.user._id}`);
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
        setErrors('Invalid email or password'); // Set a general error message
      });
  };


  return (
    <div>
      <video src={bgVd} type="video/mp4" autoPlay muted loop id="worldVid" />
      <div className="greeting row">
        <div className="col-4">
          <img src={whiteLogo} alt="logo" style={{height: "90px"}}/></div>
        <div className="col-4"></div>  
        <div className='col-4'>
          <h1 className='text-light mt-4'>WELCOME BACK!</h1>
        </div>
      </div>
      
      <div className='mt-5 row'>
        <div className="col-4"></div>
        <div className="col-4" id="login_form">
        {errors && <h6 className="text-danger">{errors}</h6>}
          <form onSubmit={handleLogin}>
            <label className='text-light' htmlFor='email'>Email</label>
            <input className='form-control' name="email" type='text' onChange={handleChangeLogin} />
            {errors.email && <h6 className="text-danger">{errors.email.message}</h6>}
            <label className='text-light' htmlFor='password'>Password</label>
            <input className='form-control' name="password" type='password'  onChange={handleChangeLogin}/>
            {errors.password && <h6 className="text-danger">{errors.password.message}</h6>}
            <br />
            <input className='btn btn-secondary fw-bold text-light' type='submit' value="Log in" />
          </form>
        </div>
        <div className="col-4"></div>
      </div>
        <div className="d-grid gap-2 col-4 mx-auto"><button onClick={ () => navigate('/register')} className='m-5  btn btn-secondary text-light'>New to the Network? Click here!</button></div>
    </div>
  )
}

export default Login