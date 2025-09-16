import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-hot-toast';

const EditOrganization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const info = location?.state?.info ;

  const [formData, setFormData] = useState(() => ({
    organization: info?.organization || '',
    address1: info?.address1 || '',
    address2: info?.address2 || '',
    phone: info?.phone || '',
    link: info?.link || '',
    email: info?.email || '',
    description: info?.description || '',
  }));

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(() => 
    info?.logo_url || 'https://placehold.co/300x300?text=Logo'
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (logo) {
      data.append('logo', logo);
    }

    try {
      await axiosInstance.put('/api/organization/details/update/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Organization updated successfully!');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      toast.error('Update failed! Please try again.');
      console.error('Update error:', err);
    }
  };

  if (!info) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">No Organization Data Found</h2>
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
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Edit Organization</h2>

        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Organization Logo"
              className="mx-auto h-32 w-32 rounded-xl object-cover border-4 border-white shadow-lg"
            />
            <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
              <Camera className="text-black" size={20} />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleLogoChange} 
                className="hidden" 
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">Click the camera icon to update logo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name *
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              autoComplete="off"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1
            </label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              autoComplete="off"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://your-website.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              autoComplete="off"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
              placeholder="Tell us about your organization..."
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Update Organization
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrganization;