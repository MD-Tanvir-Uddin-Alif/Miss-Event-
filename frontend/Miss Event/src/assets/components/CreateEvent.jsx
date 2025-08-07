import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    start_time: '',
    end_time: '',
    capacity: '',
  });

  const [banner, setBanner] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setBanner(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const submissionData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        submissionData.append(key, value);
      });

      if (banner) {
        submissionData.append('banner', banner);
      }

      await axiosInstance.post('/api/event/create/', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      toast.success("Event created successfully!");

      setFormData({
        title: '',
        location: '',
        description: '',
        start_time: '',
        end_time: '',
        capacity: '',
      });
      setBanner(null);

      navigate('/dashboard/events');

    } catch (err) {
      console.error(err);
      toast.error('Failed to create event. Please check your input.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow border border-black p-8">
        <h2 className="text-2xl font-bold text-black mb-6 text-center uppercase tracking-wide">Create New Event</h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-center mb-2">{success}</p>}

        <form className="space-y-5" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Title</label>
            <input name="title" type="text" value={formData.title} onChange={handleChange} placeholder="Event Title"
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black placeholder-gray-400" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Location</label>
            <input name="location" type="text" value={formData.location} onChange={handleChange} placeholder="Event Location"
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black placeholder-gray-400" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Description</label>
            <textarea name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Event Description"
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black placeholder-gray-400" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Start Time</label>
            <input name="start_time" type="datetime-local" value={formData.start_time} onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">End Time</label>
            <input name="end_time" type="datetime-local" value={formData.end_time} onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Capacity</label>
            <input name="capacity" type="number" value={formData.capacity} onChange={handleChange} placeholder="Total Capacity"
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black placeholder-gray-400" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-1">Banner Image</label>
            <input name="banner" type="file" accept="image/*" onChange={handleFileChange}
              className="w-full px-4 py-2 border border-black rounded-lg bg-white text-black cursor-pointer" />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
