import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'

const EditPost = (user) => {
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)
    const [image, setImage] = useState("");
    const [post, setPost] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${id}`, { withCredentials: true })
            .then(res => {
                console.log('get user', user)
                console.log("current Post", res.data);
                setPost(res.data)
            })
            .catch(err => console.log("Error getting post", err))
    }, [])


    const handleUpdate = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/post/update/${id}`, post, { withCredentials: true })
            .then(res => {
                const postUser = res.data.creator._id
                console.log('postUser', postUser)
                console.log('submitted post', res.data);
                navigate(`/profile/${postUser}`)
            })
            .catch(err => {
                console.log("Error updating post", err)
                setErrors(err.response.data.errors)
            })
    }

    const handleChange = (e) => {
        setPost((prevPost) => {
            if (!prevPost) {
                return { content: e.target.value };
            }
            return { ...prevPost, [e.target.name]: e.target.value };
        });
    };



    return (
        <div className='background'>
            <Navbar />
            <div className="d-flex justify-content-center">
                <div className='block'>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            {errors.content ? <h6 className="text-danger">{errors.content.message}</h6> : null}
                            <img
                                            key={post.image}
                                            value={post.image}
                                            className=""
                                            style={{ margin: '10px', }}
                                            src={post.image}
                                            alt="profilePhoto" />
                            <textarea type='text' value={post.content} className="form-control" id="postText" placeholder="What's on your mind?" name="content"
                                style={{ backgroundColor: "#EDF7FB" }} onChange={handleChange} />
                        </div>
                        <div className="row">
                            <div className="col-sm-8 mt-3">
                                <label htmlFor="image" className="btn btn-outline">
                                    <i className="fas fa-image"></i>
                                    Image
                                    <input
                                        type="file"
                                        id="image"
                                        className="d-none"
                                        onChange={(e) => {
                                            setImage(e.target.files[0]);
                                        }}
                                    />
                                </label>
                                <button type='file' className='btn btn-outline mx-1' htmlFor="videoInput"><i className='fas fa-video'></i> Video</button>
                                <button type='file' className='btn btn-outline mx-1' htmlFor="attachmentInput"><i className='fas fa-paperclip'></i> Attachment</button>
                            </div>
                            <div className="col-sm-4 text-end mt-3">
                                <button type="submit" className="btn specColor">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default EditPost;