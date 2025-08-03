import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Navbar = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('accessToken'));

  useEffect(() => {
    const updateLoginStatus = () => {
      setIsLogin(!!localStorage.getItem('accessToken'));

      if (!localStorage.getItem('accessToken')) {
        setUserProfile(null);
      }
    };


    window.addEventListener('loginStatusChanged', updateLoginStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', updateLoginStatus);
    };
  }, []);



  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isLogin) {
        try {
          const res = await axiosInstance.get('/api/user/profile/');
          setUserProfile(res.data);

          // If user is an organizer, fetch organization details for logo
          if (res.data.is_organizer) {
            const orgRes = await axiosInstance.get('/api/organization/details/');
            setUserProfile(prev => ({ ...prev, organization: orgRes.data }));
          }
        } catch (err) {
          console.error('Failed to fetch profile:', err);
        }
      }
    };

    fetchUserProfile();
  }, [isLogin]);

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
      setUserProfile(null);
      navigate('/login/');
    }catch(err){
      localStorage.clear();
      setIsLogin(false);
      setUserProfile(null);
      navigate('/login');
    }
  };


  const getProfileImage = () => {
    if (!userProfile) return 'https://via.placeholder.com/60';
    
    // If user is organizer and has organization data, use organization logo
    if (userProfile.is_organizer && userProfile.organization?.logo) {
      return userProfile.organization.logo;
    }
    
    // Otherwise use user profile image
    return userProfile.image || 'https://i.pravatar.cc/150?img=5';
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
                  src={getProfileImage()}
                  alt="Profile"
                  className="w-14 h-14 rounded-full border border-black object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/60';
                  }}
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
