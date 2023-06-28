import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

const Posts = ({ postList, setPostList }) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("getting all posts", postList);
                const response = await axios.get('http://localhost:8000/api/posts/all', { withCredentials: true });
                setPostList(response.data);
                console.log("this is all posts", response.data);
            } catch (error) {
                console.log("Error fetching all posts", error);
            }
        };
        fetchPosts();
    }, []);


    const deletePost = (id) => {
        axios.delete(`http://localhost:8000/api/post/delete/${id}`, { withCredentials: true })
            .then((res) => {
                setPostList(postList.filter((post) => post._id !== id))
                console.log("after delete",res.data);
            })
            .catch(err => console.log("Error deleting post", err))
    }
    const getOnePost = (id) => {
        axios.get(`http://localhost:8000/api/post/${id}`, { withCredentials: true })
            .then((res) => {
                console.log("one Post",res.data);
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
            <div className="">
                {/* view for all posts in friend list */}
                {postList && postList.map((post, id) => (
                    <div className='mid-block p-3'
                        key={id}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                className='rounded-circle'
                                src={post.creator.profilePhoto}
                                alt={`${post.creator.firstName} ${post.creator.lastName}`}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    margin: '20px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleViewProfile(post.creator._id)}
                            />
                            <div>
                                <div>
                                    {post.creator.firstName} {post.creator.lastName}
                                </div>
                                <div>
                                    {getTimeSince(post.createdAt)} ago
                                </div>
                            </div>
                        </div>
                        <img
                            src={post.image}
                            alt={post.content}
                            style={{ width: '100%', height: 'auto', display: 'block' , marginLeft: '15px'}}
                        />
                        <div className='m-3'>
                            <h5 >{post.content}</h5>
                            {/* <div>
                                {post?.creator?.tags.map((tag, index) => (
                                    <div key={index}className='badge bg-secondary me-1'>
                                        #{tag}
                                    </div>
                                ))}
                            </div> */}
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
                            <button 
                            type='button' 
                            className='btn btn-outline me-2' 

                            onClick={() => getOnePost(post._id)}>
                                <i className='fas fa-edit'></i>
                                 Edit
                            </button>
                            <button type='button' className='btn btn-outline me-2' onClick={()=> deletePost(post._id)}>
                                <i className='fas fa-trash'></i> Delete
                            </button>
                        </div>
                        <div className='d-flex justify-content-center mx-3'>
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