import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

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
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch organization details:', err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="text-center text-lg mt-10">Loading profile...</div>;
  }

  if (profile.is_organizer && organization) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 flex-shrink-0 flex flex-col justify-between border-r border-gray-300 bg-white p-6 shadow-md">
          <div>
            <h2 className="mb-6 text-xl font-bold text-gray-800">Dashboard</h2>
            <nav className="space-y-4">
              <button className="w-full rounded-lg bg-black px-4 py-2 text-left text-white transition hover:bg-gray-800">
                Organization
              </button>
              <button className="w-full rounded-lg border border-black px-4 py-2 text-left text-black transition hover:bg-black hover:text-white">
                Create Event
              </button>
              <button className="w-full rounded-lg border border-black px-4 py-2 text-left text-black transition hover:bg-black hover:text-white">
                Events
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-auto">
          <div className="w-full max-w-4xl mx-auto rounded-2xl border border-gray-300 bg-white p-8 shadow-lg">
            <div className="mb-6 flex justify-center">
              <img
                className="h-32 w-32 rounded-xl border border-gray-400 object-cover"
                src={organization.logo || 'https://via.placeholder.com/300x300.png?text=Logo'}
                alt="Organization Logo"
              />
            </div>

            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">{organization.organization}</h1>
              <p className="text-sm text-gray-600">
                Username: <span className="font-medium text-gray-800">{organization.organizer}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 text-gray-800 md:grid-cols-2">
              <div>
                <h3 className="text-sm text-gray-500">Address Line 1</h3>
                <p className="mt-1">{organization.address1}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Address Line 2</h3>
                <p className="mt-1">{organization.address2}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Website</h3>
                <a href={organization.link} target="_blank" className="mt-1 text-blue-600 hover:underline">
                  {organization.link}
                </a>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Description</h3>
                <p className="mt-1">{organization.description}</p>
              </div>
            </div>

            <div className="mt-10 flex justify-center gap-4">
              <button className="rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800">
                Update Info
              </button>
              <button className="rounded-lg border border-black px-5 py-2 text-black transition hover:bg-black hover:text-white">
                Change Password
              </button>
            </div>
          </div>
        </main>
      </div>
    );
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
