import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const PostForm = ({ postList, setPostList }) => {
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)
    const [image, setImage] = useState('');

    // useEffect(() => {
    //     console.log("getting all posts", postList)
    // }
    //     , [])

    const handleChange = (e) => {
        setPost((prevPost) => {
            if (!prevPost) {
                return { content: e.target.value };
            }
            return { ...prevPost, [e.target.name]: e.target.value };
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const photoUrl = await handlePhotoChange(image);
        console.log("submitting post, photoUrl", photoUrl);
        axios
            .post('http://localhost:8000/api/post/create', {...post, image:photoUrl}, { withCredentials: true })
            .then(res => {
                console.log("Post created", res.data);
                setErrors([]);
                setPost({ content: "" });
                setLoaded(true);
                setPostList(prevPostList => [res.data,...prevPostList ]);
            })
            .catch(err => {
                console.log("Error creating post", err);
                setErrors(err.response.data.errors);
                setLoaded(false);
            });
    };



    const handlePhotoChange = async (image) => {
        const photoData = new FormData();
        photoData.append("file", image);
        photoData.append("upload_preset", "byjlcqbx");
        console.log("this is the image", image)
        console.log("this is the photo data", photoData)
        try {
        const response = await axios
            .post("https://api.cloudinary.com/v1_1/dijdukoam/image/upload", photoData)
        return (response.data.url);
                // console.log("this is the response", response);
                // setPost({ ...post, image: sourceUrl });
                // console.log(response.data.url);
        } catch (error) {
            console.log("Error uploading photo", error);
        }
    };

    return (
        <div>
            <div className='mid-block mb-4'>
                {/* <h4 className='p-2'>Submit a Post</h4> */}
                {/* <form onSubmit={(id) ? handleUpdate : handleSubmit}> */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {errors.content ? <h6 className="text-danger">{errors.content.message}</h6> : null}
                        {post.image && (
                            <img
                                key={post.image}
                                className=""
                                style={{ 
                                    margin: '10px', 
                                    height: 'auto',
                                    width: '100%',
                                }}
                                src={post.image}
                                alt="post image"
                            />
                        )}
                        <textarea type='text' value={post.content} className="form-control" id="postText" placeholder="What's on your mind?" name="content"
                            style={{ backgroundColor: "#EDF7FB" }} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <div className="col-sm-8 mt-3">
                            <label htmlFor="postImage" className="btn btn-outline">
                                <i className="fas fa-image"></i>
                                Image
                            </label>
                            <input
                                type="file"
                                id="postImage"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    setPost({ ...post, image: URL.createObjectURL(e.target.files[0]) });
                                    // handlePhotoChange(e.target.files[0]);
                                }}
                                style={{ display: 'none' }}
                            />
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