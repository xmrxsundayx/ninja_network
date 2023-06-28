import React, { useEffect, useState }  from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const PostForm = ({postList, setPostList}) => {
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const [post, setPost] = useState({
        content: "",
        image: "",
        tags:"",
    })
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

    const handleSubmit = (e) => {
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

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log("updating post")
        axios.put(`http://localhost:8000/api/post/update/${id}`, post, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                navigate('/profile/'+ id)
            })
            .catch(err => {console.log("Error updating post" + err)
            setErrors(err.response.data.errors)})
    }

    return (
        <div>
            <div className='mid-block mb-4'>
              {/* <h4 className='p-2'>Submit a Post</h4> */}
                <form onSubmit={(id) ? handleUpdate : handleSubmit}>
                    <div className="form-group">
                        {errors.content ? <h6 className="text-danger">{errors.content.message}</h6> : null}
                        <textarea type='text' value={post.content}className="form-control" id="postText" placeholder="What's on your mind?" name="content"
                        style={{ backgroundColor: "#EDF7FB"}} onChange={handleChange}/>
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