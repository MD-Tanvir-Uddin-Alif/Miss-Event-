import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('accessToken'));

  useEffect(() => {
    const updateLoginStatus = () => {
      setIsLogin(!!localStorage.getItem('accessToken'));
    };

    window.addEventListener('loginStatusChanged', updateLoginStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', updateLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    // localStorage.clear();
    // setIsLogin(false);
    // window.location.href = '/login';

    try{
      const refreshToken = localStorage.getItem('refreshToken');
      await axiosInstance.post('/api/user/logout/',{
        refresh: refreshToken,
      });

      localStorage.clear();
      setIsLogin(false);
      navigate('/login/');
    }catch(err){
      localStorage.clear();
      setIsLogin(false);
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <span className="text-black text-xl font-bold">Miss Event!</span>
        </div>

        <div className="flex items-center space-x-6">
          <NavLink to='/' className={({ isActive }) => `text-black font-semibold ${isActive ? 'underline' : ''}`}>Home</NavLink>
          <a href="#" className="text-black font-semibold hover:underline">Explore</a>

          {!isLogin ? (
            <NavLink to='/login/'>
              <button className="rounded-md border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition">Login</button>
            </NavLink>
          ) : (
            <div className="relative inline-block text-left">
              <input type="checkbox" id="dropdownToggle" className="hidden peer" />
              <label htmlFor="dropdownToggle" className="cursor-pointer">
                <img
                  src="https://via.placeholder.com/60"
                  alt="Profile"
                  className="w-14 h-14 rounded-full border border-black object-cover"
                />
              </label>

              <div className="dropdown-menu hidden peer-checked:block absolute right-0 mt-2 w-40 bg-white border border-black rounded-lg shadow-md z-10">
                <Link>
                <button className="w-full text-left block px-4 py-2 text-sm hover:bg-black hover:text-white transition">Profile</button>
                </Link>
                <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm hover:bg-black hover:text-white transition">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
