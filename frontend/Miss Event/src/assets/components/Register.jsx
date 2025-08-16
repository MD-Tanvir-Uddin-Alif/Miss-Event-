import React, { useState } from 'react';
import axiosPublic from '../../utils/axiospublic';
import {Camera, Shield, Zap, Headphones,Building, Megaphone} from 'lucide-react';
import { data, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


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

const UserForm = ({ formData, onChange, onSubmit, onImageChange, avatarPreview }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Register Yourself</h2>
    <AvatarUpload preview={avatarPreview} onImageChange={onImageChange} alt="User Avatar" />
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField label="First Name" name="first_name" placeholder="John" value={formData.first_name} onChange={onChange} />
        <InputField label="Last Name" name="last_name" placeholder="Doe" value={formData.last_name} onChange={onChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField label="Username" name="username" placeholder="johndoe" value={formData.username} onChange={onChange} />
        <InputField label="Email" type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={onChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField label="Phone Number" type="tel" name="phone" placeholder="123-456-7890" value={formData.phone} onChange={onChange} maxLength={11} />
        <InputField label="Address" name="address" placeholder="123 Main St, City" value={formData.address} onChange={onChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={onChange} />
        <InputField label="Confirm Password" type="password" name="password1" placeholder="••••••••" value={formData.password1} onChange={onChange} />
      </div>
      <button type="button" onClick={onSubmit} className="w-full py-3.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition duration-300 shadow-lg">Create Account</button>
      <div className="text-center text-sm text-gray-600 mt-4">
        Already have an account? <Link to='/login/' className="font-medium text-black hover:underline">Sign in</Link>
      </div>
    </div>
  </div>
);

const OrganizationForm = ({ formData, onChange, onSubmit, onImageChange, logoPreview }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Organization Details</h2>
    <AvatarUpload preview={logoPreview} onImageChange={onImageChange} alt="Organization Logo" />
    <div className="space-y-5">
      <InputField label="Organization Name" name="organization" placeholder="Your Organization" value={formData.organization} onChange={onChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField label="Address Line 1" name="address1" placeholder="123 Main St" value={formData.address1} onChange={onChange} />
        <InputField label="Address Line 2" name="address2" placeholder="Suite 200" value={formData.address2} onChange={onChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField label="Phone Number" type="tel" name="phone" placeholder="123-456-7890" value={formData.phone} onChange={onChange} maxLength={11} />
        <InputField label="Email" type="email" name="email" placeholder="org@example.com" value={formData.email} onChange={onChange} />
      </div>
      <InputField label="Website URL" type="url" name="link" placeholder="https://example.com" value={formData.link} onChange={onChange} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea name="description" placeholder="Brief description of your organization..." rows="3" value={formData.description} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField label="Username" name="username" placeholder="orgusername" value={formData.username} onChange={onChange} />
        <InputField label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={onChange} />
      </div>
      <InputField label="Confirm Password" type="password" name="password1" placeholder="••••••••" value={formData.password1} onChange={onChange} />
      <button type="button" onClick={onSubmit} className="w-full py-3.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition duration-300 shadow-lg">Register Organization</button>
      <div className="text-center text-sm text-gray-600 mt-4">
        Already have an account? <Link to='/login/' className="font-medium text-black hover:underline">Sign in</Link>
      </div>
    </div>
  </div>
);

const Register = () => {
  const [isOrganization, setIsOrganization] = useState(false);
  const [userFormData, setUserFormData] = useState({
    first_name: '', last_name: '', username: '', email: '', phone: '', image: '', address: '', password: '', password1: ''
  });
  const [orgFormData, setOrgFormData] = useState({
    organization: '', address1: '', address2: '', phone: '', link: '', email: '', description: '', logo: '', username: '', password: '', password1: ''
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleInput = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (setPreview, setter, field) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
        setter(prev => ({ ...prev, [field]: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (formData, type) => {
  if (formData.password !== formData.password1) {
    toast.error("Passwords do not match!");
    return;
  }

  try {
    const apiUrl = type === 'User'
      ? '/api/user/registration/'
      : '/api/organization/register/';

    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) submitData.append(key, value);
    });

    const response = await axiosPublic.post(apiUrl, submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response);

    toast.success(`${type} registration successful! Please confirm your email to activate your account.`);
  } catch (error) {
    if (error.response?.data) {
      const messages = Object.values(error.response.data).flat();
      console.log(error?.response.data);
      messages.forEach(msg => toast.error(msg));
    } else {
      toast.error("Something went wrong. Try again later.");
    }
  }
};


  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="font-medium text-gray-800">Register as an Organization</h2>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={isOrganization}
                onChange={(e) => setIsOrganization(e.target.checked)}
                className="opacity-0 w-0 h-0 peer"
              />
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition peer-checked:bg-black"></span>
              <span className="absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform transform peer-checked:translate-x-full peer-checked:bg-white"></span>
            </label>
          </div>
          {isOrganization ? (
            <OrganizationForm
              formData={orgFormData}
              onChange={handleInput(setOrgFormData)}
              onSubmit={() => handleSubmit(orgFormData, 'Organization')}
              onImageChange={handleImageChange(setLogoPreview, setOrgFormData, 'logo')}
              logoPreview={logoPreview}
            />
          ) : (
            <UserForm
              formData={userFormData}
              onChange={handleInput(setUserFormData)}
              onSubmit={() => handleSubmit(userFormData, 'User')}
              onImageChange={handleImageChange(setAvatarPreview, setUserFormData, 'image')}
              avatarPreview={avatarPreview}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
