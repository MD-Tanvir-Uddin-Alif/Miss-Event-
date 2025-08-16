import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSucessFull = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-black mb-4">
          🎉 Registration Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Your account has been activated. You can now log in and start exploring events.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationSucessFull;
