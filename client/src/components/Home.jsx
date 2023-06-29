// Jared's component
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import StickyBox from "react-sticky-box"
import PostForm from './PostForm';
import Posts from './Posts';
import github from '../images/github-logo.jpeg';
import reactimage from '../images/logo192.png';
import mongologo from '../images/MongoDB-Logo.jpg';
import postman from '../images/postman-icon.png'
import vscodelogo from "../images/visualstudio_code-card.webp"

const Home = ({ user, setUser }) => {
  const [apiPosts, setApiPosts] = useState([]);
  const [apiUsers, setApiUsers] = useState([])
  const [addedFriends, setAddedFriends] = useState(user.friends || []);
  const [selectedUser, setSelectedUser] = useState(null);
  const [postList, setPostList] = useState([]);
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
  }, [setUser]);

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


  const handleViewProfile = () => {
    navigate(`/profile/${user._id}`);
  };

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


  return (
    <div className='background pb-4'>
      <Navbar />
      <div className="mt-5">
        <div className="row justify-content-center">
          {/* Left Column */}
          <div className="col-1"></div>
          <div className="col-3">
            <StickyBox offsetTop={90} offsetBottom={0}>
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
                    src={user.profilePhoto}
                    alt={`${user.firstName} ${user.lastName}`}
                    onClick={handleViewProfile}
                  />
                  <h2>{user.firstName}</h2>
                  <h2>{user.lastName}</h2>
                  <p>{user.jobTitle}</p>
                  <button className='btn specColor' onClick={handleViewProfile}>View Profile</button>
                </div>
              </div>
              <div className='left-block p-3'>
                <h5 className='p-2 specColor' style={{
                  fontFamily: 'Roboto',
                  borderRadius: '10px'
                }}>
                  Ninja Network brought to you by...</h5>
                <div className='d-flex flex-column align-items-center'>
                <img className='logos' src={github} alt="" />
                <img className='logos' src={reactimage} alt="" />
                <img className='logos' src={mongologo} alt="" />
                <img className='logos' src={vscodelogo} alt="" />
                <img className='logos mt-3' src={postman} alt="" />
                </div>
              </div>


            </StickyBox>
          </div>
          {/* -------------------------------------------------------------------------------------------------- */}
          {/* <!-- Middle Column --> */}
          <div className="col-4">
            <StickyBox offsetTop={90}>
              < PostForm postList={postList} setPostList={setPostList} />
            </StickyBox>
            < Posts postList={postList} setPostList={setPostList} user={user} setUser={setUser}/>
          </div>

          {/* -------------------------------------------------------------------------------------------------- */}
          {/* Right Column */}
          <div className="col-3">
            <StickyBox offsetTop={90} offsetBottom={0}>
              <div className='right-block'>
                <h4 className='p-2'>Ninjas Online</h4>
                <div>
                  <div className='my-2'>
                    {apiUsers && apiUsers.map((apiUser) => (
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
          <div className="col-1"></div>
        </div>
      </div>
    </div >
  )
}

export default Home