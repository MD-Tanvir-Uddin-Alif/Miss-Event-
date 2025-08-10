import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axiospublic from '../../utils/axiospublic';

const ResetForgotPassword = () => {
  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await axiospublic.post('/api/user/reset-password/confirm/', {
        new_password: formData.new_password,
      });

      toast.success('Password reset successfully!');
      setFormData({ new_password: '', confirm_password: '' });
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 text-white flex items-center justify-center min-h-screen">
      <div className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="new_password" className="block text-sm font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirm_password" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetForgotPassword;
