import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const PostForm = ({postList, setPostList}) => {
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const [post, setPost] = useState([])
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/post/${id}`)
            .then (res => {
                console.log(res.data);
                setPost(res.data)
            })
            .catch(err => console.log("Error fetching post" + err))
        }
    }, [])

    const handleChange  = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submitting post")
        axios.post('http://localhost:8000/api/post/create', post, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                setErrors([])
                setLoaded(true)
                console.log("Post created" + res.data);
                setPostList([...postList, res.data])
                // navigate('/posts')
            })
            .catch(err => {
                console.log("Error creating post" + err);
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
                        <textarea className="form-control" id="postText" placeholder="What's on your mind?"
                        style={{ backgroundColor: "#EDF7FB"}}>
                        </textarea>
                        </div>
                        <div className="row">
                        <div className="col-sm-8 mt-3">
                            <button type='file' className='btn btn-outline' htmlFor="imageInput"><i className='fas fa-image'></i> Image</button>
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
    )
}

export default PostForm