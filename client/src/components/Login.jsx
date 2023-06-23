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
        navigate('/profile/:id')
      })
      .catch(err => {
        console.log(err)
        console.log(err.response.data);
        setErrors(err.response.data.errors)
      })
  }


  return (
    <div className='login_page'>
      <video src={bgVd} type="video/mp4" autoplay muted loop id="worldVid" />
      <h1 className='text-light'>Welcome back! Login</h1>
      {/* ***********Delete Me***************** (just made this so you can easily get to the site)*/}
      <div>
        <a href="/home" className="nav-item nav-link active text-white">
          Home
        </a>
      </div>
      {/* ***********Delete Me***************** */}
      {errors && <h6 classname="text-danger">{errors}</h6>}
      <div id="login_form" >
        <form onSubmit={handleLogin}>
          <label className='text-light' htmlFor='email'>Email</label>
          <input className='form-control' type='text' onChange={handleChange} />
          {/* why do we have a handleChange here when it is in the submit button? */}
          <label className='text-light' htmlFor='password'>Password</label>
          <input className='form-control' type='password' />
          <br />
          <button className='btn btn-secondary text-dark' type='submit' onChange={handleChange}>Login</button>
        </form>
      </div>
    // </div>
  )
}

export default Login