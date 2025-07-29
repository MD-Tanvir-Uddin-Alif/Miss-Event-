import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 flex-shrink-0 flex flex-col justify-between border-r border-gray-300 bg-white p-6 shadow-md">
        <div>
          <h2 className="mb-6 text-xl font-bold text-gray-800">Dashboard</h2>
          <nav className="space-y-4">
            <button className="w-full rounded-lg bg-black px-4 py-2 text-left text-white transition hover:bg-gray-800">
              Organization
            </button>
            <button className="w-full rounded-lg border border-black px-4 py-2 text-left text-black transition hover:bg-black hover:text-white">
              Create Event
            </button>
            <button className="w-full rounded-lg border border-black px-4 py-2 text-left text-black transition hover:bg-black hover:text-white">
              Events
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
