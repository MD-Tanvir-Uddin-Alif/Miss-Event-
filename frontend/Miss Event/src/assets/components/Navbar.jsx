import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white shadow sticky top-0 z-10">
        <div className="mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <img className="h-10 w-10" src="./login-removebg-preview.png" alt="Logo" />
            <span className="text-black text-xl font-bold">Miss Event!</span>
          </div>

          <div className="flex items-center space-x-6">
            <NavLink to='/'  className={({isActive})=>`text-black font-semibold ${isActive? 'underline':''}`}>Home</NavLink>
            <a href="#" className="text-black font-semibold hover:underline">Explore</a>
            <NavLink to='/login/'>
              <button className="rounded-md border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition">Login</button>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;