import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditProfile = ({ user, setUser }) => {
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)



    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/user/${id}`)
                .then(res => {
                    console.log(res.data);
                    setUser(res.data)
                })
                .catch(err => console.log("Error fetching user" + err))
        }
    }
        , [])

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handlePhotoChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }


    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submitting user")
        axios.put(`http://localhost:8000/api/user/${id}`, user, { withCredentials: true }, { headers: { "Content-Type": "multipart/form-data" } })
            .then(res => {
                console.log(res.data);
                setErrors([])
                setLoaded(true)
                console.log("User updated" + res.data);
                // navigate('/home')
            })
            .catch(err => {
                console.log("Error updating user" + err);
                setErrors(err.response.data.errors)
                setLoaded(false)
            })
    }


    return (
        <div>
            <div className='block'>
                {/* <h4 className='p-2'>Submit a Post</h4> */}
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" id="firstName" name='firstName' value={user.firstName} onChange={handleChange} />
                        {errors.firstName ? <p className='text-danger'>{errors.firstName.message}</p> : ''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" id="lastName" name='lastName' value={user.lastName} onChange={handleChange} />
                        {errors.lastName ? <p className='text-danger'>{errors.lastName.message}</p> : ''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" name='email' value={user.email} onChange={handleChange} />
                        {errors.email ? <p className='text-danger'>{errors.email.message}</p> : ''}
                    </div>
                    <div>
                        <label htmlFor="profilePhoto">Profile Photo:</label>
                        <input type="file" id="profilePhoto" onChange={handlePhotoChange} />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <input type="text" className="form-control" id="bio" name='bio' value={user.bio} onChange={handleChange}/>
                        {errors.bio ? <p className='text-danger'>{errors.bio.message}</p> : ''}
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text" className="form-control" id="location" name='location' value={user.location} onChange={handleChange} />
                        {errors.location ? <p className='text-danger'>{errors.location.message}</p> : ''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input type="text" className="form-control" id="website" name='website' value={user.website} onChange={handleChange} />
                        {errors.website ? <p className='text-danger'>{errors.website.message}</p> : ''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="linkedin">Linkedin</label>
                        <input type="text" className="form-control" id="linkedin" name='linkedin' value={user.linkedin} onChange={handleChange} />
                        {errors.linkedin ? <p className='text-danger'>{errors.linkedin.message}</p> : ''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="github">Github</label>
                        <input type="text" className="form-control" id="github" name='github' value={user.github} onChange={handleChange} />
                        {errors.github ? <p className='text-danger'>{errors.github.message}</p> : ''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="other">Other</label>
                        <input type="text" className="form-control" id="other" name='other' value={user.other} onChange={handleChange} />
                        {errors.other ? <p className='text-danger'>{errors.other.message}</p> : ''}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="col-3"></div>
        </div>
    )
}

export default EditProfile;
