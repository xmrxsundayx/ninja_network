// Sandy's component
import React, { useEffect, useState } from 'react';
import api from '../api/dummy';


// Sample code to test api
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
            <div>
                <h2>My Ninjas</h2>
                {/* {friends.length === 0 ? ( */}
                <p>Add Some Ninjas, My Ninja...</p>
                {/* ) : (
        <></>
          )} */}
            </div>
            <div>
                <h2>All Ninjas</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {friends.map((friend) => (
                        <div key={friend.id} style={{ width: '50%', padding: '20px' }}>
                            <img
                                src={friend.picture}
                                alt={`${friend.firstName} ${friend.lastName}`}
                                style={{ width: '100px', height: 'auto', margin: '20px' }}
                            />
                            {friend.firstName} {friend.lastName}
                        </div>
                    ))}
                </div>
                <h2>All Ninjas</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {friends.map((friend) => (
                        <div key={friend.id} style={{ width: '50%', padding: '20px' }}>
                            <img
                                src={friend.picture}
                                alt={`${friend.firstName} ${friend.lastName}`}
                                style={{ width: '100px', height: 'auto', margin: '20px' }}
                            />
                            {friend.firstName} {friend.lastName}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Friends;