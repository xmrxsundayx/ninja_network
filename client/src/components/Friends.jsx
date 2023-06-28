// Sandy's component test
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/dummy';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';



// Sample code to test api
const Friends = ({ user, setUser }) => {
    const [apiUsers, setApiUsers] = useState([]);
    const [addedFriends, setAddedFriends] = useState(user.friends || []);
    const [selectedUser, setSelectedUser] = useState(null);
    const { userId } = useParams();
    const navigate = useNavigate();


    // this is to get the one User info

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/logged`, { withCredentials: true })
            .then(res => {
                // show the user returned
                console.log("logged user:" + res.data._id)
                console.log(res.data.friends)
                setUser(res.data);
            })
            .catch(err => {
                console.log("current user error: " + err)
                setUser({})
            });
    }, [setUser]);

    // Fetch user data based on the URL ID
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/user/${userId}`);
                setApiUsers(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users/');
                setApiUsers(response.data);
                console.log('Fetch all users',response.data);
            } catch (error) {
                console.error('Error fetching ninjas:', error);
            }
        };

        fetchAllUsers();
    }, []);


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
            jobTitle: '',
            languages: [],
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


    return (
        <div className='background'>
            <Navbar />
            <div className='background pb-4'>
                {/* <div className='container col-md-8'> */}
                <div className='col-md-6 mid-block mx-auto mb-5'>
                    <h2 className='my-2 ms-4 ps-3'>My Ninjas</h2>
                    <div className='d-flex justify-content-center mb-3'>
                        {(!user.friends || user.friends.length === 0) && addedFriends.length === 0 ? (
                            <p>Add Some Ninjas, My Ninja...</p>
                        ) : (
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '20px',
                                }}
                            >
                                {user.friends.map((friend) => (
                                    <div
                                        key={friend._id}
                                        style={{
                                            width: '350px',
                                            padding: '0px 10px',
                                            background: 'rgb(237,247,251)',
                                            borderRadius: '30px',
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
                                                width: '80px',
                                                height: '80px',
                                                margin: '20px',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        {friend.firstName} {friend.lastName}
                                        <div>
                                            <button
                                                className='btn btn-outline-danger mx-3'
                                                onClick={(e) => handleDeleteFriend(e, friend._id)}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className='col-md-6 mid-block mx-auto mb-5'>
                    <h2 className='my-2 ms-4 ps-3'>All Ninjas</h2>
                    <div className='d-flex justify-content-center mb-3'>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '20px',
                            }}
                        >
                            {apiUsers && apiUsers.map((apiUser) => (
                                <div
                                    key={apiUser._id}
                                    style={{
                                        width: '350px',
                                        padding: '0px 10px',
                                        background: 'rgb(237,247,251)',
                                        borderRadius: '30px',
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
                                            width: '80px',
                                            height: '80px',
                                            margin: '20px 10px 20px 10px',
                                            borderRadius: '50%',
                                        }}
                                    />
                                    {apiUser.firstName} {apiUser.lastName}
                                    <div>
                                        <button
                                            className='btn btn-outline-primary mx-3'
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
            </div>
        </div>
    );
};

export default Friends;
