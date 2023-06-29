import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const PostForm = ({ postList, setPostList }) => {
    const { id } = useParams()
    const [errors, setErrors] = useState({})
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)


    // useEffect(() => {
    //     if (id) {
    //         axios.get(`http://localhost:8000/api/post/${id}`, { withCredentials: true })
    //             .then(res => {
    //                 console.log(res.data);
    //                 setPost(res.data)
    //             })
    //             .catch(err => console.log("Error fetching post" + err))
    //     }
    // }, [])

    // -----------------------------------------------------------------------------------------------------------------
    // const getAuth = () => {
    //     useEffect(() => {
    //       const token = // Obtain the authentication token from storage
    //       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //     }, []);

    // const getAuthTokenFromCookies = () => {
    //     const cookies = document.cookie.split(';');
    //     for (let i = 0; i < cookies.length; i++) {
    //         const cookie = cookies[i].trim();
    //         if (cookie.startsWith('yourTokenCookieName=')) {
    //             return cookie.substring('yourTokenCookieName='.length);
    //         }
    //     }
    //     return null; // Token not found in cookies
    // };

    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthTokenFromCookies();

    // const token = getAuthTokenFromCookies();
    // -----------------------------------------------------------------------------------------------------------------

    // const handleChange = (e) => {
    //     setPost((prevPost) => ({
    //         ...prevPost,
    //         [e.target.name]: e.target.value,
    //     }));
    //     console.log(post);
    // };



    // const handleSubmit = (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     console.log("submitting post");
    //     axios
    //         .post('http://localhost:8000/api/post/create', post, { withCredentials: true })
    //         .then(res => {
    //             console.log("Post created", res.data);
    //             setErrors([]);
    //             setLoaded(true);
    //             setPostList(prevPostList => [...prevPostList, res.data]);
    //             setPost({});
    //         })
    //         .catch(err => {
    //             console.log("Error creating post", err);
    //             setErrors(err.response.data.errors);
    //             setLoaded(false);
    //         });
    // };




    const handleUpdate = (e) => {
        e.preventDefault()
        console.log("updating post")
        axios.put(`http://localhost:8000/api/post/update/${id}`, post, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                navigate('/profile/' + id)
            })
            .catch(err => {
                console.log("Error updating post" + err)
                setErrors(err.response.data.errors)
            })
    }

    // const handlePhotoChange = (e) => {
    //     e.preventDefault()
    //     const photoData = new FormData();
    //     photoData.append("file", image);
    //     photoData.append("upload_preset", "byjlcqbx");
    //     console.log("this is the image", image)
    //     console.log("this is the photo data", photoData)

    //     axios
    //         .post("https://api.cloudinary.com/v1_1/dijdukoam/image/upload", formData)
    //         .then((response) => {
    //             const sourceUrl = response.data.url;
    //             console.log("this is the response", response);
    //             setPost({ ...post, image: sourceUrl });
    //             console.log(response.data.url);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8000/api/posts/all', { withCredentials: true });
    //             setPostList(response.data);
    //             console.log("this is all posts", response.data);
    //         } catch (error) {
    //             console.log("Error fetching all posts", error);
    //         }
    //     };
    //     fetchPosts();
    // }, []);

    //Trying out moving Posts.jsx code here
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/posts/all', { withCredentials: true });
                const fetchedPosts = response.data;
                setPostList(fetchedPosts);
                console.log('postlist',postList)
                console.log('These are all the posts:', fetchedPosts);
            } catch (error) {
                console.log('Error fetching all posts', error);
            }
        };

        fetchPosts();
    }, [setPostList]);

    const handleChange = (e) => {
        setPost((prevPost) => {
            if (!prevPost) {
                return { content: e.target.value };
            }
            return { ...prevPost, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8000/api/post/create', post, { withCredentials: true })
            .then((res) => {
                console.log('Post created', res.data);
                setErrors({});
                setLoaded(true);
                setPostList((prevPostList) => {
                    const updatedPostList = [...prevPostList, res.data];
                    console.log(updatedPostList);
                    return updatedPostList;
                });
                setPost({ content: '' });
            })
            .catch((err) => {
                console.log('Error creating post', err);
                setErrors(err.response.data.errors);
                setLoaded(false);
            });
    };

    const deletePost = (id) => {
        axios.delete(`http://localhost:8000/api/post/delete/${id}`, { withCredentials: true })
            .then((res) => {
                setPostList(postList.filter((post) => post._id !== id))
                console.log("after delete", res.data);
            })
            .catch(err => console.log("Error deleting post", err))
    }

    const getOnePost = (id) => {
        axios.get(`http://localhost:8000/api/post/${id}`, { withCredentials: true })
            .then((res) => {
                console.log("one Post", res.data);
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
            <div className='mid-block mb-4'>
                {/* <h4 className='p-2'>Submit a Post</h4> */}
                {/* <form onSubmit={(id) ? handleUpdate : handleSubmit}> */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {errors.content ? <h6 className="text-danger">{errors.content.message}</h6> : null}
                        <textarea type='text' value={post.content} className="form-control" id="postText" placeholder="What's on your mind?" name="content"
                            style={{ backgroundColor: "#EDF7FB" }} onChange={handleChange} />
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
            <div className="">
                {/* view for all posts in friend list */}
                {postList && postList.map((post) => (
                    <div className='mid-block p-3'
                        key={post._id}>
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
                            style={{ width: '100%', height: 'auto', display: 'block', marginLeft: '15px' }}
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
                            <button type='button' className='btn btn-outline me-2' onClick={() => deletePost(post._id)}>
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

export default PostForm