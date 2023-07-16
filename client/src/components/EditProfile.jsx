import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'



const EditProfile = ({ user, setUser }) => {
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)
    // const [image, setImage] = useState("");
    // const [previewImage, setPreviewImage] = useState("");


    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/${id}`, { withCredentials: true })
            .then(res => {
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
    };

    // **********************************************************************************************************************

    const handlePhotoChange = (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "byjlcqbx");
        console.log("this is the image", image)
        console.log("this is the form data", formData)

        axios
            .post("https://api.cloudinary.com/v1_1/dijdukoam/image/upload", formData)
            .then((response) => {
                const sourceUrl = response.data.url;
                console.log("this is the response", response);
                setUser({ ...user, profilePhoto: sourceUrl });
                console.log(response.data.url);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // const handlePhotoPreview = (e) => {
    //     e.preventDefault()
    //     const file = e.target.files[0];
    //     setImage(file);
    //     console.log("this is the file", file)
    //     setPreviewImage(URL.createObjectURL(file));
    // };

    // **********************************************************************************************************************


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
        <div className='background'>
            <Navbar />
            <div className="d-flex justify-content-center">
                <div className='block'>
                    <form onSubmit={submitHandler} >
                        <div className="row">
                            <div>
                                <label htmlFor='profilePhoto'>Profile Photo:</label>
                                <div>
                                        <img
                                            key={user.profilePhoto}
                                            className="rounded-circle mb-4"
                                            style={{ width: '150px', height: '150px', margin: '10px', }}
                                            src={user.profilePhoto}
                                            alt="profilePhoto" /> 
                                    <input
                                        type="file"
                                        id="profilePhoto"
                                        onChange={(e) => {
                                            // setImage(e.target.files[0]);
                                            setUser({ ...user, profilePhoto: URL.createObjectURL(e.target.files[0]) });
                                            handlePhotoChange(e.target.files[0]); 
                                          }}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>First Name</label>
                                <input type="text" className="form-control" id="firstName" name='firstName' value={user.firstName} onChange={handleChange} />
                                {errors.firstName ? <p className='text-danger'>{errors.firstName.message}</p> : ''}
                                <label>Last Name</label>
                                <input type="text" className="form-control" id="lastName" name='lastName' value={user.lastName} onChange={handleChange} />
                                {errors.lastName ? <p className='text-danger'>{errors.lastName.message}</p> : ''}
                                <label>Email</label>
                                <input type="text" className="form-control" id="email" name='email' value={user.email} onChange={handleChange} />
                                {errors.email ? <p className='text-danger'>{errors.email.message}</p> : ''}
                                <label>Job Title</label>
                                <input type="text" className="form-control" id="jobTitle" name='jobTitle' value={user.jobTitle} onChange={handleChange} />
                                {errors.jobTitle ? <p className='text-danger'>{errors.jobTitle.message}</p> : ''}
                                <label>Location</label>
                                <input type="text" className="form-control" id="location" name='location' value={user.location} placeholder="Add Location" onChange={handleChange} />
                                {errors.location ? <p className='text-danger'>{errors.location.message}</p> : ''}
                            </div>

                            <div className="col-6">
                                <label>Languages Learned</label>
                                {user?.languages?.map((language, index) => (
                                    <div key={index} className="d-flex align-items-center mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={language}
                                            placeholder='Add Language'
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
                                <div className="d-flex justify-content-end"><button
                                    type="button"
                                    className="btn btn-secondary mt-2"
                                    onClick={handleAddLanguage}
                                >
                                    Add Language
                                </button></div>
                                {errors.languages ? (
                                    <p className='text-danger'>{errors.languages.message}</p>
                                ) : (
                                    ''
                                )}
                                <label className='mt-3'>Links</label>
                                {user?.links?.map((links, index) => (
                                    <div key={index} className="d-flex align-items-center mb-3">
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
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary mt-2"
                                        onClick={handleAddLinks}
                                    >
                                        Add Link
                                    </button>
                                </div>
                                {errors.links ? (
                                    <p className='text-danger'>{errors.links.message}</p>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <button type="submit" className="mt-3 col-2 btn btn-secondary" onClick={handlePhotoChange}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;
