import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import StickyBox from "react-sticky-box"
import api from '../api/dummy';


const Profile = ({ user, setUser }) => {
  const [apiPosts, setApiPosts] = useState([]);
  const [apiUsers, setApiUsers] = useState([])
  const [addedFriends, setAddedFriends] = useState(user.friends || []);
  const [selectedUser, setSelectedUser] = useState(null);
  const [oneUser, setOneUser] = useState({})
  const [onePost, setOnePost] = useState({})
  const { userId } = useParams();
  const navigate = useNavigate();

  // this is to get the one logged User 
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/logged`, { withCredentials: true })
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

  // Fetch user data based on the URL ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${userId}`);
        setApiUsers(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  // create a useEffect to get only posts from the user
  useEffect(() => {
    const fetchOneUserPosts = async () => {
      try {
        const response = await api.get(`/user/${userId}/post`);
        setOneUser(response.data);
        console.log('Get User', response.data);
      } catch (error) {
        console.error('Error fetching ninjas post:', error);
      }
    };
    fetchOneUserPosts();
  }, [userId]);


  // this is to get the one Post info
  useEffect(() => {
    const fetchOnePost = async () => {
      try {
        const response = await api.get(`/post/${userId}/comment`);
        setOnePost(response.data);
        console.log('Get Post', response.data);
      } catch (error) {
        console.error('Error fetching Post:', error);
      }
    };
    fetchOnePost();
  }, [userId]);


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

  const handleViewHome = () => {
    navigate(`/home/${user._id}`)
  };

  const handleViewProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  const handleEditProfile = () => {
    navigate(`/profile/${user._id}/edit`);
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

  //functions to handle friends
  const handleAddFriend = (apiUser, user, e) => {
    e.stopPropagation();
    console.log('apiUser:', apiUser, 'user:', user);
  
    const friendExists = user.friends.some((friend) => friend._id === apiUser.id);
    if (friendExists) {
      window.alert('Friend already added', apiUser);
      return;
    }
  
    // Create the friend object
    const friendToAdd = {
      _id: apiUser.id,
      firstName: apiUser.firstName,
      lastName: apiUser.lastName,
      picture: apiUser.picture,
      jobTitle: 'Software Developer',
      languages: ['JavaScript', 'Python'],
    };
  
    // Send the friendToAdd object to the backend API endpoint to update the user's friends array
    axios
      .patch(`http://localhost:8000/api/users/${user._id}`, {
        friends: [...user.friends, friendToAdd],
      })
      .then((response) => {
        console.log('Friend added successfully:', response.data);
        // Update the state or perform any necessary actions after adding a friend
        setUser((prevUser) => ({
          ...prevUser,
          friends: [...prevUser.friends, friendToAdd],
        }));
        setAddedFriends((prevFriends) => [...prevFriends, friendToAdd]);
  
        // Remove the added friend from the apiUsers state
        setApiUsers((prevApiUsers) =>
          prevApiUsers.filter((user) => user.id !== apiUser.id)
        );
      })
      .catch((error) => {
        console.error('Error adding friend:', error);
      });
  };
  

  const handleFriendClick = (userId) => {
    const clickedUser = apiUsers.find((user) => user.id === userId) || user.friends.find((friend) => friend._id === userId);
    setSelectedUser(clickedUser);
    navigate(`/profile/${userId}`);
  };  
  

  const handleDeleteFriend = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const deletedFriend = user.friends.find((friend) => friend._id === id);

      await axios.patch(`http://localhost:8000/api/users/${user._id}`, {
        friends: user.friends.filter((friend) => friend._id !== id),
      });

      // Update the state after deleting the friend
      setUser((prevUser) => ({
        ...prevUser,
        friends: prevUser.friends.filter((friend) => friend._id !== id),
      }));

      setAddedFriends((prevFriends) => prevFriends.filter((friend) => friend._id !== id));

      // Add the deleted friend back to the apiUsers state
      setApiUsers((prevApiUsers) => [...prevApiUsers, deletedFriend]);
    } catch (error) {
      console.error('Error deleting friend:', error);
    }
  };


  return (
    <div className='background'>
      <Navbar />
      <div className="mt-5">
        <div className="row justify-content-center">
          {/* Left Column */}
          <div className="col-1"></div>
          <div className="col-3">
            <div className='left-block'>
              <div className='m-3 d-flex flex-column align-items-center'>
                <img
                  className="rounded-circle mb-4"
                  style={{
                    width: '150px',
                    height: '150px',
                    margin: '10px',
                    cursor: 'pointer'
                  }}
                  src={selectedUser?.picture || user.profilePhoto }
                  alt="profile"
                  onClick={handleViewProfile}
                />
                <h3>{selectedUser?.firstName || user.firstName }</h3>
                <h3>{selectedUser?.lastName || user.lastName }</h3>
                <p>{selectedUser?.jobTitle || user.jobTitle }</p>
                <button className='btn specColor' onClick={handleViewHome}>Home</button>
                <button className='btn specColor my-2' onClick={handleEditProfile}>Edit Profile</button>
              </div>
            </div>
            <div className='left-block'>
              <h5>Languages Learned</h5>
              <div className='d-flex flex-sm-wrap' >
                {user?.languages?.map((language) => (
                  <div
                    key={language._id}
                    style={{
                      padding: '0px 10px',
                      borderRadius: '20px',
                      margin: '1px 1px',
                      background: "lightblue"
                    }}
                  >
                    {language}
                  </div>
                ))}
              </div>
              <div>
                <h5 className='mt-3'>Social Media Links</h5>
                {user?.links?.map((link) => (
                  <div key={link._id}>
                    <a href={link} target='_blank' rel='noreferrer'>{link}</a>
                  </div>
                ))}
              </div>
              <div>
                <h5>Location</h5>
                <p>{user.location}</p>
              </div>
            </div>
            <StickyBox offsetTop={100} offsetBottom={0}>

              <div className=' left-block'>
                <h4 className=' p-2'>My Ninjas</h4>
                {(!user.friends || user.friends.length === 0) && addedFriends.length === 0 ? (
                  <p>Add Some Ninjas, My Ninja...</p>
                ) : (
                  <div>
                    <div className='my-1'>
                      {user.friends.map((friend) => (
                        <div
                          key={friend._id}
                          style={{
                            padding: '10px',
                            margin: '5px',
                            background: 'rgb(237,247,251)',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                          onClick={() => handleFriendClick(friend._id)}
                        >
                          <img
                            src={friend.picture}
                            alt={`${friend.firstName} ${friend.lastName}`}
                            style={{
                              width: '50px',
                              height: 'auto',
                              borderRadius: '50%',
                            }}
                          />
                          {friend.firstName} {friend.lastName}
                          <div>
                            <button
                              className='btn btn-sm btn-outline-danger mx-3'
                              onClick={(e) => handleDeleteFriend(e, friend._id)}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </StickyBox>
          </div>
          {/* -------------------------------------------------------------------------------------------------- */}
          {/* <!-- Middle Column --> */}
          <div className="col-4">
            <div className=''>
              {apiPosts.map((apiPost, i) => (
                <div className='mid-block'
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
          <div className="col-3">
            <StickyBox offsetTop={100} offsetBottom={0}>
              <div className='right-block'>
                <h4 className='p-2'>Ninjas Online</h4>
                <div>
                  <div className='my-2'>
                    {apiUsers && apiUsers.map((apiUser) => (
                      <div
                        key={apiUser.id}
                        style={{
                          padding: '10px',
                          margin: '5px',
                          background: 'rgb(237,247,251)',
                          borderRadius: '20px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                        onClick={() => handleFriendClick(apiUser.id)}
                      >
                        <img
                          src={apiUser.picture}
                          alt={`${apiUser.firstName} ${apiUser.lastName}`}
                          style={{
                            width: '50px',
                            height: 'auto',
                            borderRadius: '50%',
                          }}
                        />
                        {apiUser.firstName} {apiUser.lastName}
                        <div>
                          <button
                            className='btn btn-sm btn-outline-primary mx-3'
                            onClick={(e) => handleAddFriend(apiUser, user, e)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </StickyBox>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div >
  )
}

export default Profile