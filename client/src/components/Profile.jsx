import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import StickyBox from "react-sticky-box"
import Posts from './Posts';


const Profile = ({ user, setUser, postList, setPostList, selectedUser, setSelectedUser }) => {
  const [apiUsers, setApiUsers] = useState([])
  const [addedFriends, setAddedFriends] = useState(user.friends || []);
  const [oneUserPosts, setOneUserPosts] = useState([]);
  const [onePost, setOnePost] = useState({});
  const [selectedUserPosts, setSelectedUserPosts] = useState([]);
  const [showSelectedUserPosts, setShowSelectedUserPosts] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [setUser]);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // create a useEffect to get only posts from the user
  // useEffect(() => {
  //   // const fetchUserPosts = async () => {
  //   //   try {
  //   if (selectedUser) {
  //     axios.get(`http://localhost:8000/api/posts/selecteduser/${selectedUser._id}`, { withCredentials: true })
  //       .then((response) => {
  //         console.log('Get Selected User Posts', response);
  //         setSelectedUserPosts(response.data);
  //         setShowSelectedUserPosts(true)
  //       })
  //       .catch((error) => {
  //           console.error('Error fetching user posts:', error);
  //       })
  //   }
  //   else {
  //     axios.get(`http://localhost:8000/api/posts/user/${userId}`, { withCredentials: true })
  //       .then((response) => {
  //         setOneUserPosts(response.data);
  //         console.log('Get User Posts', response.data);
  //         setShowSelectedUserPosts(false);

  //       })
  //       .catch((error) => {
  //         console.error('Error fetching user posts:', error);
  //     })
  //   }
  // } catch (error) {
  //   console.error('Error fetching user posts:', error);
  // }

  // fetchUserPosts();
  // }, [selectedUser, userId]);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // this is to get the one Post info
  //           useEffect(() => {
  //             const fetchOnePost = async () => {
  //     try {
  //       const response = await axios.get(`/post/${userId}/comment`);
  //       setOnePost(response.data);
  //       console.log('Get Post', response.data);
  //     } catch (error) {
  //       console.error('Error fetching one Post:', error);
  //     }
  //   };
  //   fetchOnePost();
  // }, [userId]);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // this is to get all the Users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/');
        setApiUsers(response.data);
        console.log('Fetch all users', response.data);
      } catch (error) {
        console.error('Error fetching ninjas:', error);
      }
    };
    fetchAllUsers();
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

    const friendExists = user.friends.some((friend) => friend._id === apiUser._id);
    if (friendExists) {
      window.alert('Friend already added', apiUser);
      return;
    }

    // Create the friend object
    const friendToAdd = {
      _id: apiUser._id,
      firstName: apiUser.firstName,
      lastName: apiUser.lastName,
      profilePhoto: apiUser.profilePhoto,
      jobTitle: apiUser.jobTitle,
      languages: apiUser.languages,
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
          prevApiUsers.filter((user) => user._id !== apiUser._id)
        );
      })
      .catch((error) => {
        console.error('Error adding friend:', error);
      });
  };

  const handleFriendClick = (userId) => {
    const clickedUser = apiUsers.find((user) => user._id === userId) || user.friends.find((friend) => friend._id === userId);
    setSelectedUser(clickedUser);
    navigate(`/profile/${userId}`);
  };


  const handleDeleteFriend = async (e, _id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const deletedFriend = user.friends.find((friend) => friend._id === _id);

      await axios.patch(`http://localhost:8000/api/users/${user._id}`, {
        friends: user.friends.filter((friend) => friend._id !== _id),
      });

      // Update the state after deleting the friend
      setUser((prevUser) => ({
        ...prevUser,
        friends: prevUser.friends.filter((friend) => friend._id !== _id),
      }));

      setAddedFriends((prevFriends) => prevFriends.filter((friend) => friend._id !== _id));

      // Add the deleted friend back to the apiUsers state
      setApiUsers((prevApiUsers) => [...prevApiUsers, deletedFriend]);
    } catch (error) {
      console.error('Error deleting friend:', error);
    }
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


  return (
    <div className='background'>
      <Navbar />
      <div className="mt-5">
        <div className="row justify-content-center">
          {/* Left Column */}
          <div className="col-1" />
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
                  src={selectedUser?.profilePhoto || user.profilePhoto}
                  alt="profile"
                  onClick={handleViewProfile}
                />
                <h3>{selectedUser?.firstName || user.firstName}</h3>
                <h3>{selectedUser?.lastName || user.lastName}</h3>
                <p>{selectedUser?.jobTitle || user.jobTitle}</p>
                <button className='btn specColor' onClick={handleViewHome}>Home</button>
                {!selectedUser || (selectedUser._id === user._id) ?
                  <button className='btn specColor my-2' onClick={handleEditProfile}>Edit Profile</button>
                  : null
                }
              </div>
            </div>
            <div className='left-block'>
              <h5>Languages Learned</h5>
              <div className='d-flex flex-sm-wrap' >
                {selectedUser?.languages || user?.languages?.map((language) => (
                  <div
                    key={language._id}
                    style={{
                      padding: '0px 10px',
                      borderRadius: '20px',
                      margin: '1px 1px',
                      background: "lightblue"
                    }}
                  >
                    <div>{language}</div>
                  </div>
                ))}
              </div>
              <div>
                <h5 className='mt-3'>Social Media Links</h5>
                {selectedUser?.links || user?.links?.map((link) => (
                  <div key={link._id}>
                    <a href={link} target='_blank' rel='noreferrer'>{link}</a>
                  </div>
                ))}
              </div>
              <div>
                <h5>Location</h5>
                <p>{selectedUser?.location || user.location}</p>
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
                            src={friend.profilePhoto}
                            alt={`${friend.firstName} ${friend.lastName}`}
                            style={{
                              width: '50px',
                              height: '50px',
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
            <StickyBox offsetTop={90}>
              < Posts postList={postList} setPostList={setPostList} user={user} setUser={setUser} />
            </StickyBox>
          </div>

          {/* -------------------------------------------------------------------------------------------------- */}
          {/* Right Column */}
          <div className="col-3">
            <StickyBox offsetTop={100} offsetBottom={0}>
              <div className='right-block'>
                <h4 className='p-2'>Suggested Ninjas</h4>
                <div>
                  <div className='my-2'>
                    {apiUsers && apiUsers
                      .filter(apiUser => {
                        // Check if the user is already a friend
                        const friendExists = user.friends.some(friend => friend._id === apiUser._id);
                        // Check if the user is the logged-in user
                        const isCurrentUser = apiUser._id === user._id;
                        return !friendExists && !isCurrentUser; // Return true if the user is NOT a friend and NOT the logged-in user
                      })
                      .map((apiUser) => (
                        <div
                          key={apiUser._id}
                          style={{
                            padding: '10px',
                            margin: '5px',
                            background: 'rgb(237,247,251)',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                          onClick={() => handleFriendClick(apiUser._id)}
                        >
                          <img
                            src={apiUser.profilePhoto}
                            alt={`${apiUser.firstName} ${apiUser.lastName}`}
                            style={{
                              width: '50px',
                              height: '50px',
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
          <div className="col-1" />
        </div>
      </div>
    </div >
  )
}

export default Profile