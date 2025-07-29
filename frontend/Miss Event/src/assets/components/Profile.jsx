import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import DashboardLayout from './DashboardLayout';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/api/user/profile/');
        setProfile(res.data);

        if (res.data.is_organizer) {
          fetchOrganizationDetails();
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    const fetchOrganizationDetails = async () => {
      try {
        const res = await axiosInstance.get('/api/organization/details/');
        setOrganization(res.data);
      } catch (err) {
        console.error('Failed to fetch organization details:', err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="text-center text-lg mt-10">Loading profile...</div>;
  }

  //Organizer View
  if (profile.is_organizer && organization) {
    return (
      // <DashboardLayout>
        <div className="w-full max-w-4xl mx-auto rounded-2xl border border-gray-300 bg-white p-8 shadow-lg">
          <div className="mb-6 flex justify-center">
            <img
              className="h-32 w-32 rounded-xl border border-gray-400 object-cover"
              src={organization.logo || 'https://placehold.co/300x300?text=Logo'}
              alt="Organization Logo"
            />
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {organization.organization}
            </h1>
            <p className="text-sm text-gray-600">
              Username:{' '}
              <span className="font-medium text-gray-800">
                {organization.organizer.username}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
            <div>
              <p className="text-sm font-semibold">Email</p>
              <p>{organization.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Phone</p>
              <p>{organization.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Address Line 1</p>
              <p>{organization.address1 || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Address Line 2</p>
              <p>{organization.address2 || 'N/A'}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold">Website</p>
              <a
                href={organization.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {organization.link || 'N/A'}
              </a>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold">Description</p>
              <p>{organization.description || 'N/A'}</p>
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
      // </DashboardLayout>
    );
  }

  //Normal User View
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

        <div className="space-y-4 text-gray-800">
          <div>
            <p className="text-sm font-semibold">Full Name</p>
            <p>{profile.first_name} {profile.last_name}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Email</p>
            <p>{profile.email}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Phone</p>
            <p>{profile.phone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Address</p>
            <p>{profile.address || 'N/A'}</p>
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
