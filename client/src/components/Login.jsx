// Khrista's component
import React, { useState } from 'react'
import bgVd from '../images/bgVid.mp4'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/login', userLogin, { withCredentials: true })
      .then(res => {
        console.log(res)
        console.log(res.data.user)
        navigate('/home')
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
      <h1 className='greeting text-light'>Welcome back! Login</h1>
      {/* ***********Delete Me***************** (just made this so you can easily get to the site)*/}
      <div>
        <a href="/home" className=" greeting nav-item nav-link active text-white">
          Home
        </a>
      </div>
      {/* ***********Delete Me***************** */}
      <div id="login_form" >
      {errors && <h6 classname="text-danger">{errors}</h6>}
        <form onSubmit={handleLogin}>
          <label className='text-light' htmlFor='email'>Email</label>
          <input className='form-control' name="email" type='text' onChange={handleChange} />
          <label className='text-light' htmlFor='password'>Password</label>
          <input className='form-control' name="password" type='password'  onChange={handleChange}/>
          <br />
          <input className='btn btn-secondary text-dark' type='submit' value="Log in" />
        </form>
      </div>
    </div>
  )
}

export default Login