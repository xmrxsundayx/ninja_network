// Sandy's component test
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/dummy';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';


// Sample code to test api
const Friends = ({ user, setUser }) => {
    const [apiUsers, setApiUsers] = useState([]);
    const [addedFriends, setAddedFriends] = useState([]);
    const { userId } = useParams();


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


    const handleAddFriend = (apiUser) => {
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
            .patch(`/api/users/${user._id}`, { friends: [friendToAdd, ...addedFriends] }) // Pass an array containing the existing addedFriends and the new friendToAdd
            .then((response) => {
                console.log('Friend added successfully:', response.data);
                // Update the state or perform any necessary actions after adding a friend
                setAddedFriends((prevFriends) => [...prevFriends, friendToAdd]);
            })
            .catch((error) => {
                console.error('Error adding friend:', error);
            });
    };


    return (
        <div>
            <Navbar />
            <div className=''>
                <div className='container col-md-8'>
                    <h2>My Ninjas</h2>
                    {addedFriends.length === 0 ? (
                        <p>Add Some Ninjas, My Ninja...</p>
                    ) : (
                        <div>
                            {/* Display all of my ninjas */}
                            {addedFriends.map((friend) => (
                                <div key={friend._id}>
                                    <img
                                        src={friend.picture}
                                        alt={`${friend.firstName} ${friend.lastName}`}
                                        style={{
                                            width: '100px',
                                            height: 'auto',
                                            margin: '20px',
                                            borderRadius: '50%',
                                        }}
                                    />
                                    {friend.firstName} {friend.lastName}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='container col-md-8'>
                    <h2>All Ninjas</h2>
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
                                <button className='btn btn-outline-primary mx-3' onClick={() => handleAddFriend(apiUser)}>+</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Friends;