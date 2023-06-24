import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import bgVd from '../images/bgVid.mp4'
import axios from 'axios'

const Register = () => {
const [registerUser, setUser] = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const [errors, setErrors] = useState('')
const navigate = useNavigate()

const handleReg = (e) => {
  e.preventDefault()
  axios.post('http://localhost:8000/api/register', registerUser, { withCredentials: true })
    .then(res => {
      console.log(res)
      navigate('/home')
        // change to :id when we have the user id set up
    })
    .catch(err => {
      console.log(err)
      console.log(err.response.data);
    setErrors(err.response.data.errors)
    })
}
// handleReg is the function that will be called when the form is submitted and will make the post request to the server

const handleChangeReg = (e) => {
  setUser({ ...registerUser, [e.target.name]: e.target.value })

}

  return (
    <div id="reg_page">
      <video src={bgVd} type="video/mp4" autoPlay muted loop id="worldVid" />
      <h1 className='greeting text-light'>Join the Shinobi Ichizoku</h1>
      <button onClick={ () => navigate('/login')} className='btn btn-secondary text-light'>Already in the Fam? Click here!</button>
{/* ***********Delete Me***************** (just made this so you can easily get to the site)*/}
      <div>
        <a href="/home" className=" nav-item nav-link active text-white">
          Home
        </a>
      </div>
{/* **********^^^^^^^*Delete Me***************** */}
    <div className='row'>
      {errors && <h6 classname="text-danger">{errors}</h6>}
      <div className="col-3"></div>
      <div className="col-6">
        <form onSubmit={handleReg} className="register_form">
          <label className='text-light' htmlFor='firstName'>First Name</label>
          <input type="text" className="form-control" name="firstName" onChange={handleChangeReg}/>
          <label className='text-light' htmlFor='lastName'>Last Name</label>
          <input type="text" className="form-control" name="lastName" onChange={handleChangeReg}/>
          <label className='text-light' htmlFor='email'>Email</label>
          <input type="text" className="form-control" name="email" onChange={handleChangeReg}/>
          <label className='text-light' htmlFor='password'>Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChangeReg}/>
          <label className='text-light' htmlFor='confirmPassword'>Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" onChange={handleChangeReg}/>
          <br/>
          <input type="submit" className="btn fw-bold  btn-secondary" value="Register" />
        </form>
      </div>
      <div className="col-3"></div>
      </div>
    </div>
  )
}

export default Register