import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-hot-toast';

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const info = location?.state?.info

  const [formData, setFormData] = useState(() => ({
    first_name: info?.first_name || '',
    last_name: info?.last_name || '',
    email: info?.email || '',
    phone: info?.phone || '',
    address: info?.address || '',
  }));

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(() => 
    info?.image_url || 'https://i.pravatar.cc/150?img=5'
  );

  // Handle input changes - FIXED: Simplified
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (image) {
      data.append('image', image);
    }

    try {
      await axiosInstance.put('/api/user/update/profile/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Profile updated successfully!');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      toast.error('Update failed! Please try again.');
      console.error('Update error:', err);
    }
  };

  // Debug: Check if data is received
  if (!info) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">No Profile Data Found</h2>
          <p className="text-gray-600 mb-4">Please go back to the profile page and try again.</p>
          <button 
            onClick={() => navigate('/profile')}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        {/* Avatar Upload */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <img
              src={preview}
              alt="User Avatar"
              className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <label className="absolute bottom-0 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
              <Camera className="text-black" size={16} />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              autoComplete="off"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              autoComplete="off"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              autoComplete="off"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              autoComplete="off"
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              autoComplete="off"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;