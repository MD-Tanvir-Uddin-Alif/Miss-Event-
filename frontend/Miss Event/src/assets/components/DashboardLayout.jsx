import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.endsWith(path);

  const navItems = [
    { path: '/dashboard/profile', label: 'Organization' },
    // { path: '/dashboard/create-event', label: 'Create Event' },
    // { path: '/dashboard/events', label: 'Events' },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow-xl p-6 space-y-8 border-r border-gray-300">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className='block'>
              <button
                className={`flex items-center gap-2 w-full py-3 px-4 rounded-xl border text-left text-sm font-medium transition-all duration-200
                  ${
                    isActive(item.path)
                      ? 'bg-gray-800 text-white shadow-md'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                  }`}
              >
                {item.label}
              </button>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
