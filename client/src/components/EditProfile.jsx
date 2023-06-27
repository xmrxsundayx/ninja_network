import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Upload from './UploadTest'


const EditProfile = ({ user, setUser }) => {
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)




    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/${id}`, { withCredentials: true })
            .then(res => {
                // show the user returned
                console.log("logged user:", res.data)
                setUser(res.data);
            })
            .catch(err => {
                console.log("current user error: ", err)
                setUser({})
            });
    }, []);

    const handleChange = (e) => {
        e.preventDefault()
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // const handlePhotoChange = (e) => {
    //     e.preventDefault()
    //     setUser({ ...user, [e.target.name]: e.target.files[0] })
    // }
    const handlePhotoChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const fileName = file.name;
        setUser({ ...user, profilePhoto: fileName });
      };

    const handleRemoveLanguage = (index) => {
        const newLanguages = [...user.languages]
        newLanguages.splice(index, 1)
        setUser({ ...user, languages: newLanguages })
    }
    
    const handleAddLanguage = (e) => {
        e.preventDefault()
        const newLanguages = [...user.languages, '']
        setUser({ ...user, languages: newLanguages })
    };
    
    const handleAdditionalLanguageChange = (index, value) => {
        const updatedLanguages = [...user.languages];
        updatedLanguages[index] = value;
        setUser({ ...user, languages: updatedLanguages });
    };



    const handleRemoveLinks = (index) => {
        const newLinks = [...user.links]
        newLinks.splice(index, 1)
        setUser({ ...user, links: newLinks })
    }

    const handleAddLinks = (e) => {
        e.preventDefault()
        const newLinks = [...user.links, '']
        setUser({ ...user, links: newLinks })
    };

    const handleAdditionalLinksChange = (index, value) => {
        const updatedLinks = [...user.links];
        updatedLinks[index] = value;
        setUser({ ...user, links: updatedLinks });
    };



    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submitting user", user)
        axios.patch(`http://localhost:8000/api/users/${id}`, user, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setErrors([])
                setLoaded(true)
                console.log("User updated", res.data);
                navigate(`/profile/${user._id}`)
            })
            .catch(err => {
                console.log("Error updating user", err);
                setErrors(err.response.data.errors)
                setLoaded(false)
            })
    }


    return (
        <div>
            <div className='block'>
                {/* <h4 className='p-2'>Submit a Post</h4> */}
                <form onSubmit={submitHandler} >
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" id="firstName" name='firstName' value={user.firstName} onChange={handleChange} />
                        {errors.firstName ? <p className='text-danger'>{errors.firstName.message}</p> : ''}
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" id="lastName" name='lastName' value={user.lastName} onChange={handleChange} />
                        {errors.lastName ? <p className='text-danger'>{errors.lastName.message}</p> : ''}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" id="email" name='email' value={user.email} onChange={handleChange} />
                        {errors.email ? <p className='text-danger'>{errors.email.message}</p> : ''}
                    </div>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" className="form-control" id="jobTitle" name='jobTitle' value={user.jobTitle} onChange={handleChange} />
                        {errors.jobTitle ? <p className='text-danger'>{errors.jobTitle.message}</p> : ''}
                    </div>

                    <div className="form-group">
                        <label>Languages Learned</label>
                        {user.languages.map((language, index) => (
                            <div key={index} className="d-flex align-items-center mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={language}
                                    onChange={(e) => handleAdditionalLanguageChange(index, e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger ms-2"
                                    onClick={() => handleRemoveLanguage(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-primary mt-2"
                            onClick={handleAddLanguage}
                        >
                            Add Another Language
                        </button>
                        {errors.languages ? (
                            <p className='text-danger'>{errors.languages.message}</p>
                        ) : (
                            ''
                        )}
                    </div>

                    <div>
                        <label>Profile Photo:</label>
                        <input type="file" id="profilePhoto" name='profilePhoto'  onChange={handlePhotoChange} />
                    </div>
                    <div className="form-group">
                        <label>Links</label>
                        {user.links.map((links, index) => (
                            <div key={index} className="d-flex align-items-center mt-2">
                                <input
                                    type="url"
                                    className="form-control"
                                    value={links}
                                    onChange={(e) => handleAdditionalLinksChange(index, e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger ms-2"
                                    onClick={() => handleRemoveLinks(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-primary mt-2"
                            onClick={handleAddLinks}
                        >
                            Add Another Link
                        </button>
                        {errors.links ? (
                            <p className='text-danger'>{errors.links.message}</p>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" className="form-control" id="location" name='location' value={user.location} onChange={handleChange} />
                        {errors.location ? <p className='text-danger'>{errors.location.message}</p> : ''}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Upload user={user} setUser={setUser}/>
            <div className="col-3"></div>
        </div>
    )
}

export default EditProfile;