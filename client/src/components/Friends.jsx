// Sandy's component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/dummy';


// Sample code to test api
const Friends = () => {
    const [apiUsers, setApiUsers] = useState([]);

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
        };

        // Send the friendToAdd object to the backend API endpoint to update the user's friends array
        axios.patch(`/api/users/${apiUser._id}`, { friends: friendToAdd })
            .then((response) => {
                console.log('Friend added successfully:', response.data);
                // Update the state or perform any necessary actions after adding a friend
            })
            .catch((error) => {
                console.error('Error adding friend:', error);
            });
    };

    return (
        <div>
            <div>
                <h2>My Ninjas</h2>
                <p>Add Some Ninjas, My Ninja...</p>
            </div>
            <div>
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
                                border: '1px solid',
                                borderRadius:'20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <img
                                src={apiUser.picture}
                                alt={`${apiUser.firstName} ${apiUser.lastName}`}
                                style={{ width: '100px', height: 'auto', margin: '20px' }}
                            />
                            {apiUser.firstName} {apiUser.lastName}
                            <button onClick={() => handleAddFriend(apiUser)}>+</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Friends;