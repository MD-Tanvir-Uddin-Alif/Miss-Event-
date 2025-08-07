import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';

const UpdateEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;

  const [formData, setFormData] = useState({
    title: event?.title || '',
    location: event?.location || '',
    description: event?.description || '',
    start_time: event?.start_time?.slice(0, 16) || '',
    end_time: event?.end_time?.slice(0, 16) || '',
    capacity: event?.capacity || '',
    banner: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'banner') {
      setFormData((prev) => ({
        ...prev,
        banner: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('location', formData.location);
      data.append('description', formData.description);
      data.append('start_time', formData.start_time);
      data.append('end_time', formData.end_time);
      data.append('capacity', formData.capacity);
      if (formData.banner) {
        data.append('banner', formData.banner);
      }

      await axiosInstance.patch(`/api/event/detail/${event.id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Event updated successfully!');
      navigate('/dashboard/events');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update event. Please check your input.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow border border-black p-8">
        <h2 className="text-2xl font-bold text-black mb-6 text-center uppercase tracking-wide">Update Event</h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-center mb-2">{success}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Title</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black"
              placeholder="Event Title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Location</label>
            <input
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black"
              placeholder="Event Location"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black"
              placeholder="Event Description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Start Time</label>
            <input
              name="start_time"
              type="datetime-local"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">End Time</label>
            <input
              name="end_time"
              type="datetime-local"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Capacity</label>
            <input
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black"
              placeholder="Total Capacity"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Banner Image</label>
            <input
              name="banner"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-black bg-white"
            />
          </div>

          {event.banner && (
            <div className="mt-2">
              <p className="text-sm text-black font-medium mb-1">Current Banner:</p>
              <img
                src={event.banner}
                alt="Current Banner"
                className="w-full h-48 object-cover rounded border"
              />
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
