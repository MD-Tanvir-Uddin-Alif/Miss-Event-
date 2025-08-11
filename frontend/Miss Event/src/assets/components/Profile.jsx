import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/api/user/profile/');
        setProfile(res.data);

        if (res.data.is_organizer) {
          fetchOrganizationDetails();
        } else {
          fetchUserEvents(res.data.id);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    const fetchOrganizationDetails = async () => {
      try {
        const res = await axiosInstance.get('/api/organization/details/');
        localStorage.setItem('organization_id', res.data.id);
        setOrganization(res.data);
      } catch (err) {
        console.error('Failed to fetch organization details:', err);
      }
    };

    const fetchUserEvents = async (userId) => {
      try {
        setLoadingEvents(true);
        const res = await axiosInstance.get(`/api/event/user-event/${userId}/`);
        setUserEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch user events:', err);
        toast.error('Failed to load registered events');
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteEvent = (eventId) => {
    // Show custom toast confirmation
    toast(
      (t) => (
        <div className="flex flex-col">
          <p className="mb-2">Are you sure you want to cancel this registration?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toast.promise(
                  axiosInstance
                    .delete(`http://127.0.0.1:8000/api/event/cancle/register/${eventId}/`)
                    .then(() => {
                      setUserEvents((prevEvents) =>
                        prevEvents.filter((event) => event.id !== eventId)
                      );
                    }),
                  {
                    loading: 'Cancelling registration...',
                    success: 'Registration cancelled successfully.',
                    error: 'Failed to cancel registration.',
                  }
                );
              }}
              className="px-3 py-1 bg-black text-white rounded hover:bg-gray-900"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-50 rounded text-black hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: 'top-center',
        style: { minWidth: '300px' },
      }
    );
  };

  if (!profile) {
    return <div className="text-center text-lg mt-10">Loading profile...</div>;
  }

  // Organizer View
  if (profile.is_organizer && organization) {
    return (
      <div className="w-full max-w-4xl mx-auto rounded-2xl border border-gray-300 bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <img
            className="h-32 w-32 rounded-xl border border-gray-400 object-cover"
            src={organization.logo || 'https://placehold.co/300x300?text=Logo'}
            alt="Organization Logo"
          />
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{organization.organization}</h1>
          <p className="text-sm text-gray-600">
            Username:{' '}
            <span className="font-medium text-gray-800">{organization.organizer.username}</span>
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
          <Link to="/organization_info/edit" state={{ info: organization }}>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Edit Profile
            </button>
          </Link>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition"
          >
            Event
          </button>
          <Link to="/reset-password">
            <button className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition">
              Change Password
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Normal User View
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl mb-8">
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
            <p>
              {profile.first_name} {profile.last_name}
            </p>
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
          <Link to="/profile/edit" state={{ info: profile }}>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Edit Profile
            </button>
          </Link>
          <Link to="/reset-password">
            <button className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition">
              Change Password
            </button>
          </Link>
        </div>
      </div>

      {/* Registered Events Section */}
      <div className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Registered Events</h3>

        {loadingEvents ? (
          <p>Loading events...</p>
        ) : userEvents.length === 0 ? (
          <p className="text-gray-600">You have not registered for any events.</p>
        ) : (
          <ul className="space-y-3">
            {userEvents.map((event) => (
              <li
                key={event.id}
                className="flex justify-between items-center border border-gray-300 rounded-md p-3"
              >
                <span className="text-gray-800 font-medium">{event.title}</span>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
