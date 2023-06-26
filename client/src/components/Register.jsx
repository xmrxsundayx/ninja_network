import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import bgVd from '../images/bgVid.mp4'
import axios from 'axios'
import whiteLogo from '../images/logoWhite.png'

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
      navigate(`/home/${res.data.user._id}`);
    })
    .catch(err => {
      console.log('I am err',err)
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
      <div className="greeting row">
        <div className="m-2 col-4">
          <img src={whiteLogo} alt="logo" style={{height: "90px"}}/></div>
        <div className='m-2 col-5'>
          <h1 className='text-light mt-3'>Join the Shinobi Kazoku</h1>
        </div>
      </div>
{/* ***********Delete Me***************** (just made this so you can easily get to the site)*/}
      <div>
        <a href="/home" className=" nav-item nav-link active text-white">
          Home
        </a>
      </div>
{/* **********^^^^^^^*Delete Me***************** */}
    <div className='row'>
      {/* {errors && <h6 classname="text-danger">{errors}</h6>} */}
      <div className="col-4"></div>
      <div className="mt-5 col-4">
        <form onSubmit={handleReg} className="register_form">
          <label className='text-light' htmlFor='firstName'>First Name</label>
          <input type="text" className="form-control" name="firstName" onChange={handleChangeReg}/>
          {errors.firstName && <h6 className="text-danger">{errors.firstName.message}</h6>}
          <label className='text-light' htmlFor='lastName'>Last Name</label>
          <input type="text" className="form-control" name="lastName" onChange={handleChangeReg}/>
          {errors.lastName && <h6 className="text-danger">{errors.lastName.message}</h6>}
          <label className='text-light' htmlFor='email'>Email</label>
          <input type="text" className="form-control" name="email" onChange={handleChangeReg}/>
          {errors.email && <h6 className="text-danger">{errors.email.message}</h6>}
          <label className='text-light' htmlFor='password'>Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChangeReg}/>
          {errors.password && <h6 className="text-danger">{errors.password.message}</h6>}
          <label className='text-light' htmlFor='confirmPassword'>Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" onChange={handleChangeReg}/>
          {errors.confirmPassword && <h6 className="text-danger">{errors.confirmPassword.message}</h6>}
          <br/>
          <input type="submit" className="btn fw-bold btn-sm btn-secondary" value="Register" />
        </form>
      </div>
      <div className="col-4"></div>
</div>
      <div className="row">
        {/* <div className="col-4"></div> */}
        <div className="d-grid gap-2 col-4 mx-auto">
          <button onClick={ () => navigate('/login')} className=' mt-5 btn btn-secondary text-light'>Already in the Fam? Click here!</button>
        </div>
        {/* <div className="col-4"></div> */}
      </div>
      
    </div>
  )
}

export default Register