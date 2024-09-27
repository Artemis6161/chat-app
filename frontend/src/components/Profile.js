import React, { useState, useEffect } from 'react';
import authService from './services/authService';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await authService.getProfile(token);
        setProfile(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (error) {
        setMessage('Error: ' + error.response.data.message);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await authService.updateProfile(token, { name, email });
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleUpdate}>
        <h2>Profile</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Update Profile</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Profile;
