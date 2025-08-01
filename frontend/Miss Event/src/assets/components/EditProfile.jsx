import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance'; 

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const info = location?.state?.info;

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (info) {
      setFormData({
        first_name: info.first_name || '',
        last_name: info.last_name || '',
        email: info.email || '',
        phone: info.phone || '',
        address: info.address || '',
      });
      setPreview(info.image || 'https://i.pravatar.cc/150?img=5');
    }
  }, [info]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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

    // Append fields
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Append image if selected
    if (image) {
      data.append('image', image);
    }

    try {
      const res = await axiosInstance.put('/api/user/update/profile/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Update success:', res.data);
      navigate('/profile'); 
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed. Check console for details.');
    }
  };

  const InputField = ({ label, type = 'text', placeholder, value, onChange, name, maxLength }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
      />
    </div>
  );

  const AvatarUpload = ({ preview, onImageChange, alt = 'Avatar' }) => (
    <div className="text-center mb-6">
      <div className="relative inline-block">
        <img
          src={preview}
          alt={alt}
          className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <label className="absolute bottom-0 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
          <Camera className="text-black" size={16} />
          <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        <AvatarUpload preview={preview} onImageChange={handleImageChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <InputField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <InputField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <div className="sm:col-span-2">
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
