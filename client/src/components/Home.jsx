// Jared's component
import React, { useEffect, useState } from 'react';
import {useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import StickyBox from "react-sticky-box"
import api from '../api/dummy';

const Home = ({user,setUser,isLoggedIn}) => {
  const [apiPosts, setApiPosts] = useState([]);
  const [apiUsers, setApiUsers] = useState([])
  const [oneUser, setOneUser] = useState({})
  const [onePost, setOnePost] = useState({})
  const { id } = useParams();
  const navigate = useNavigate();

  // this is to get the one User info

  useEffect(() => {
    axios
        .get(`http://localhost:8000/api/users/logged`, { withCredentials: true })
        .then(res => {
            // show the user returned
            console.log("logged user:" + res.data._id)
            // 4) UPDATE THE STATE WITH CORRECT DATA
            setUser(res.data);
        })
        .catch(err => {
            console.log("current user error: " + err)
            setUser({})
    });
}, []);
  // useEffect(() => {
  //   const fetchOneUser = async () => {
  //     try {
  //       const response = await axios.get(`/api/users/${id}`, { withCredentials: true });
  //       setOneUser(response.data);
  //       console.log('Get User', response.data);
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     }
  //   };
  //   if (id) {
  //     fetchOneUser();
  //   }
  // }, [id]);

  // this is to get the one Post info
  useEffect(() => {
    const fetchOnePost = async () => {
      try {
        const response = await api.get('/post/60d21b4967d0d8992e610c90/comment');
        setOnePost(response.data);
        console.log('Get Post', response.data);
      } catch (error) {
        console.error('Error fetching Post:', error);
      }
    };
    fetchOnePost();
  }, []);

  // this is to get all the API Users
  useEffect(() => {
    const fetchAllApiUsers = async () => {
      try {
        const response = await api.get('/user', { params: { limit: 5 } });
        setApiUsers(response.data.data);
        console.log('Get All Users', response.data.data);
      } catch (error) {
        console.error('Error fetching ninjas:', error);
      }
    };
    fetchAllApiUsers();
  }, []);

  // This is used to get all the API posts
  useEffect(() => {
    const fetchAllApiPosts = async () => {
      try {
        // take away params when finished. 
        const response = await api.get('/post', { params: { limit: 20 } });
        setApiPosts(response.data.data);
        console.log('Get All Posts', response.data.data);
      } catch (error) {
        console.error('Error fetching ninjas:', error);
      }
    };
    fetchAllApiPosts();
  }, []);

  const handleViewProfile = () => {
    navigate(`/profile/${setUser._id}`);
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
    <div className='background'>
      <Navbar />
      <div className="mt-5">
        <div className="row justify-content-center">
          {/* Left Column */}
          <div className="col-md-2 col-lg-2">
            <div className='block'>
              <div className='m-3 d-flex flex-column align-items-center'>
              <img
                className="rounded-circle mb-4"
                style={{ 
                  width: '150px', 
                  height: 'auto', 
                  margin: '10px',
                  cursor: 'pointer'
                }}
                src={user.picture}
                alt={`${user.firstName} ${user.lastName}`}
                onClick={handleViewProfile}
              />
                <h3>{user.firstName}</h3>
                <h3>{user.lastName}</h3>
                <p>Software Developer</p>
                <button className='btn specColor' onClick={handleViewProfile}>View Profile</button>
              </div>
            </div>
            <div className='block'>
              <h5>Languages Learned</h5>
              <div className='d-flex flex-sm-wrap' >
                {apiUsers.map((apiUser) => (
                  <div
                    key={apiUser.id}
                    style={{
                      padding: '0px 10px',
                      borderRadius: '20px',
                      margin: '1px 1px',
                      background: "lightblue"
                    }}
                  >
                    {apiUser.firstName} {apiUser.lastName}
                  </div>
                ))}
              </div>

              {/* <input class="form-control" type="text" placeholder="Your languages go here" readonly></input> */}
              <div>
                <h5 className='mt-3'>Social Media Links</h5>
                <ul>
                  <li><a href="#">Social Media 1</a></li>
                  <li><a href="#">Social Media 2</a></li>
                  <li><a href="#">Social Media 3</a></li>
                </ul>
              </div>
              <div>
                <h5>Location</h5>
                {/* breaks code on refresh?????? */}
                {/* {oneUser.location.city}, {oneUser.location.state} */}
                <p>city, state</p>
              </div>
            </div>
            <StickyBox offsetTop={100} offsetBottom={0}>

              <div className=' block'>
                <h4 className=' p-2'>My Ninjas</h4>
                {apiUsers.map((apiUser) => (
                  <div
                    key={apiUser.id}
                    style={{
                      padding: '0px 10px',
                      borderRadius: '20px',
                      margin: '10px 0',
                      background: "#EDF7FB",
                      cursor: 'pointer'
                    }}
                    onClick={() => handleViewProfile(apiUser.id)}
                  >
                    <img className='rounded-circle'
                      src={apiUser.picture}
                      alt={`${apiUser.firstName} ${apiUser.lastName}`}
                      style={{ width: '100px', height: 'auto', margin: '20px' }}
                    />
                    {apiUser.firstName} {apiUser.lastName}
                  </div>
                ))}
              </div>
            </StickyBox>
          </div>
          {/* -------------------------------------------------------------------------------------------------- */}
          {/* <!-- Middle Column --> */}
          <div className="col-md-5 col-lg-6">
            <div className='block'>
              {/* <h4 className='p-2'>Submit a Post</h4> */}
              <form>
                <div className="form-group">
                  <textarea className="form-control" id="postText" placeholder="What's on your mind?"
                    style={{
                      backgroundColor: "#EDF7FB"
                    }}>
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
            <div className=''>
              {apiPosts.map((apiPost, i) => (
                <div className='block'
                  key={apiPost.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      className='rounded-circle'
                      src={apiPost.owner.picture}
                      alt={`${apiPost.owner.firstName} ${apiPost.owner.lastName}`}
                      style={{
                        width: '50px',
                        height: 'auto',
                        margin: '20px',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleViewProfile(apiPost.owner.id)}
                    />
                    <div>
                      <div>
                        {apiPost.owner.firstName} {apiPost.owner.lastName}
                      </div>
                      <div>
                        {getTimeSince(apiPost.publishDate)} ago
                      </div>
                    </div>
                  </div>
                  <img
                    src={apiPost.image}
                    alt={apiPost.text}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <div className='m-3'>
                    <h5 >{apiPost.text}</h5>
                    <div>
                      {apiPost.tags.map((tag, index) => (
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
          {/* -------------------------------------------------------------------------------------------------- */}
          {/* Right Column */}
          <div className="col-md-3 col-lg-3">
            <StickyBox offsetTop={100} offsetBottom={0}>
              <div className='block'>
                <h4 className='p-2'>Ninjas Online</h4>
                {apiUsers.map((apiUser) => (
                  <div
                    key={apiUser.id}
                    style={{
                      padding: '0px 10px',
                      borderRadius: '20px',
                      margin: '10px 0',
                      background: "#EDF7FB"
                    }}
                  >
                    <img className='rounded-circle'
                      src={apiUser.picture}
                      alt={`${apiUser.firstName} ${apiUser.lastName}`}
                      style={{ width: '100px', height: 'auto', margin: '20px' }}
                    />
                    {apiUser.firstName} {apiUser.lastName}
                  </div>
                ))}
              </div>
            </StickyBox>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home