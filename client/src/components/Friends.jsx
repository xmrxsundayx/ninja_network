import React, { useEffect, useState } from 'react';
import api from '../api/dummy';

const Friends = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await api.get('/user', { params: { limit: 99 } });
                setFriends(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, []);

    return (
        <div>
            <h2>All Ninjas</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.id}>{friend.firstName} {friend.lastName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Friends;
