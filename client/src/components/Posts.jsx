import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Posts = (user) => {
    const [postList, setPostList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts/all')
            .then(res => {
                console.log(res.data);
                setPostList(res.data)
            })
            .catch(err => console.log("Error fetching all posts", err))
    }, [])

    const deletePost = (id) => {
        axios.delete(`http://localhost:8000/api/posts/delete/${id}`)
            .then((res) => {
                console.log(res.data);
                setPostList(postList.filter((post) => post._id !== id))
            })
            .catch(err => console.log("Error deleting post", err))
    }

    const handleViewProfile = () => {
        navigate(`/profile/${postList.creator._id}`);
      };


    // Function for how long ago a post was posted
    function getTimeSince(publishDate) {
        const now = new Date();
        const postDate = new Date(publishDate);
        const diffInSeconds = Math.floor((now - postDate) / 1000);

        if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minutes`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hours`;
        } else if (diffInSeconds < 2592000) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} days`;
        } else if (diffInSeconds < 31536000) {
            const months = Math.floor(diffInSeconds / 2592000);
            return `${months} months`;
        } else {
            const years = Math.floor(diffInSeconds / 31536000);
            return `${years} years`;
        }
    }

    return (
        <div>
            <div className=''>
                {/* view for all posts in friend list */}
                {Array.isArray(postList) && postList((post, id) => (
                    <div className='block'
                        key={id}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                className='rounded-circle'
                                src={post.creator.picture}
                                alt={`${post.creator.firstName} ${post.creator.lastName}`}
                                style={{
                                    width: '50px',
                                    height: 'auto',
                                    margin: '20px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleViewProfile(post.creator.id)}
                            />
                            <div>
                                <div>
                                    {post.creator.firstName} {post.creator.lastName}
                                </div>
                                <div>
                                    {getTimeSince(post.creator.publishDate)} ago
                                </div>
                            </div>
                        </div>
                        <img
                            src={post.creator.image}
                            alt={post.creator.content}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                        <div className='m-3'>
                            <h5 >{post.creator.content}</h5>
                            <div>
                                {post.creator.tags.map((tag, index) => (
                                    <div key={index} className='badge bg-secondary me-1'>
                                        #{tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='d-flex justify-content-around'>
                            <button type='button' className='btn btn-outline me-2'>
                                <i className='far fa-heart'></i> Like
                            </button>
                            <button type='button' className='btn btn-outline me-2'>
                                <i className='far fa-comment'></i> Comment
                            </button>
                            <button type='button' className='btn btn-outline me-2'>
                                <i className='fas fa-share'></i> Share
                            </button>
                            {/* if id ? something so only created can delete */}
                            <button type='button' className='btn btn-outline me-2' onClick={()=> navigate(`/api/post/update/${id}`)}>
                                <i className='fas fa-edit'></i> Edit
                            </button>
                            <button type='button' className='btn btn-outline me-2' onClick={deletePost}>
                                <i className='fas fa-trash'></i> Delete
                            </button>
                        </div>
                        <div>
                            <textarea className='w-100' placeholder='Comments coming soon'></textarea>
                            {/* {onePost.map((post, index) => (
                    <div key={index}>{post}</div>
                    ))} */}
                            {/* {onePost.data} */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts