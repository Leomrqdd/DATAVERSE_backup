import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    useEffect(() => {
        // Fetch user data from backend API when component mounts
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
                },
            });
            setUserData(response.data.user); // Assuming backend sends user data in response.data.user
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/user/profile', userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
                },
            });
            console.log('Profile updated successfully:', response.data.message);
            // Optionally, show a success message or update the UI
        } catch (error) {
            console.error('Error updating profile:', error);
            // Optionally, handle errors and show appropriate messages
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input type="text" id="first_name" name="first_name" value={userData.first_name} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" value={userData.last_name} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} disabled />
                    {/* Email field disabled assuming it cannot be edited */}
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default UserProfile;
