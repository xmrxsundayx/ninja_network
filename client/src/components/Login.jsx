// Khrista's component
import React, { useState, useEffect } from 'react'
import bgVd from '../images/bgVid.mp4'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logoWhite from '../images/logoWhite.png'

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home')
    }
  }, [isLoggedIn, navigate])

  const handleChangeLogin = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/login', userLogin, { withCredentials: true })
      .then(res => {
        console.log(res)
        console.log(res.data.user)
        console.log(res.data.user._id)
        navigate(`/home/${res.data.user._id}`);
        setIsLoggedIn(true)
        // change to :id when we have the user id set up
      })
      .catch(err => {
        console.log(err)
        console.log(err.response.data);
      setErrors(err.response.data.errors)
      })
  }


  return (
    <div className='login_page'>
      <video src={bgVd} type="video/mp4" autoPlay muted loop id="worldVid" />
      <div className="greeting row">
        <div className="m-2 col-4">
          <img src={logoWhite} alt="logo" style={{height: "90px"}}/></div>
        <div className='m-2 col-5'>
          <h1 className='text-light mt-3'>WELCOME BACK!!!</h1>
        </div>
      </div>
      {/* ***********Delete Me***************** (just made this so you can easily get to the site)*/}
      <div>
        <a href="/home" className=" nav-item nav-link active text-white">
          Home
        </a>
      </div>
      {/* ***********Delete Me***************** */}
      <div className='mt-5 row'>
        <div className="col-3"></div>
        <div className="col-6" id="login_form">
        {errors && <h6 classname="text-danger">{errors}</h6>}
          <form onSubmit={handleLogin}>
            <label className='text-light' htmlFor='email'>Email</label>
            <input className='form-control' name="email" type='text' onChange={handleChangeLogin} />
            <label className='text-light' htmlFor='password'>Password</label>
            <input className='form-control' name="password" type='password'  onChange={handleChangeLogin}/>
            <br />
            <input className='btn btn-secondary fw-bold text-light' type='submit' value="Log in" />
          </form>
        </div>
        <div className="col-3"></div>
      </div>
      <button onClick={ () => navigate('/register')} className='ms-5 mt-5 btn btn-secondary text-light'>New to the Network? Click here!</button>
    </div>
  )
}

export default Login