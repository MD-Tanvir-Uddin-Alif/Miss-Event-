import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance'
const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/api/user/profile/');
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="text-center text-lg mt-10">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <div className="flex items-center space-x-6 mb-8">
          <img
            className="h-24 w-24 rounded-full object-cover border-4 border-black"
            src={profile.image || 'https://i.pravatar.cc/150?img=5'}
            alt="User Profile"
          />
          <div>
            <h2 className="text-2xl font-semibold text-black">{profile.username}</h2>
            <p className="text-sm text-gray-500">Joined: {profile.joined || 'N/A'}</p>
          </div>
        </div>

        <div className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-medium text-gray-500">First Name</label>
            <p className="mt-1">{profile.first_name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Last Name</label>
            <p className="mt-1">{profile.last_name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <p className="mt-1">{profile.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Phone</label>
            <p className="mt-1">{profile.phone || 'Not added'}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Edit Profile
          </button>
          <button className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
