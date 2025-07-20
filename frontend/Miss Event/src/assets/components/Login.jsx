import axios from 'axios';
import axiosPublic from '../../utils/axiospublic';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPublic.post('http://127.0.0.1:8000/api/user/login/', {
        username: formData.username,
        password: formData.password
      });

      const { refresh, access } = response.data;

      if (refresh && access) {
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('accessToken', access);
        toast.success("Login successful");
        navigate('/profile');
      }
    } catch (err) {
      toast.error("Login failed. Please provide the correct information");
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white text-black p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmission}>
          <div>
            <label className="block text-sm font-medium text-black">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="text-right mt-1">
              <a href="/forgot-password" className="text-sm text-black hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-200"
            >
              Login
            </button>
          </div>

          <div className="flex flex-col items-center text-center mt-4">
            <p className="text-sm text-black">Don't have an account?</p>
            <Link to="/register/" className="text-sm text-black hover:underline">
              Register Yourself
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
