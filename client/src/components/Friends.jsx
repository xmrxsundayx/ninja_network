// Sandy's component test
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/dummy';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


// Sample code to test api
const Friends = ({ user, setUser }) => {
    const [apiUsers, setApiUsers] = useState([]);
    const [addedFriends, setAddedFriends] = useState(user.friends || []);
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
    }, []);


    useEffect(() => {
        const fetchAllApiUsers = async () => {
            try {
                const response = await api.get('/user', { params: { limit: 99 } });
                setApiUsers(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching ninjas:', error);
            }
        };

        fetchAllApiUsers();
    }, []);


    const handleAddFriend = (apiUser, user) => {
        console.log('apiUser:', apiUser, 'user:', user)

        const friendExists = user.friends.some((friend) => friend._id === apiUser.id);
        if (friendExists) {
            window.alert('Friend already added', apiUser);
            return;
        };

        // Create the friend object
        const friendToAdd = {
            _id: apiUser.id,
            firstName: apiUser.firstName,
            lastName: apiUser.lastName,
            picture: apiUser.picture,
            title: 'Software Developer',
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
            })
            .catch((error) => {
                console.error('Error adding friend:', error);
            });
    };


    const handleFriendClick = (friendId) => {
        navigate(`/profile/${friendId}`);
    };

    const handleDeleteFriend = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await axios.patch(`http://localhost:8000/api/users/${user._id}`, {
                friends: user.friends.filter((friend) => friend._id !== id),
            });

            // Update the state after deleting the friend
            setUser((prevUser) => ({
                ...prevUser,
                friends: prevUser.friends.filter((friend) => friend._id !== id),
            }));

            setAddedFriends((prevFriends) => prevFriends.filter((friend) => friend._id !== id));
        } catch (error) {
            console.error('Error deleting friend:', error);
        }
    };


    return (
        <div>
            <Navbar />
            <div className=''>
                <div className='container col-md-8'>
                    <h2 className='my-3'>My Ninjas</h2>
                    {user.friends.length === 0 ? (
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
                                            width: '80px',
                                            height: 'auto',
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
                <div className='container col-md-8'>
                    <h2 className='mt-5 my-3'>All Ninjas</h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '20px',
                        }}
                    >
                        {apiUsers.map((apiUser) => (
                            <div
                                key={apiUser.id}
                                style={{
                                    width: '350px',
                                    padding: '0px 10px',
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
                                        width: '80px',
                                        height: 'auto',
                                        margin: '20px 10px 20px 10px',
                                        borderRadius: '50%',
                                    }}
                                />
                                {apiUser.firstName} {apiUser.lastName}
                                <div>
                                    <button
                                        className='btn btn-outline-primary mx-3'
                                        onClick={() => handleAddFriend(apiUser, user)}
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
    );
};

export default Friends;
