import React from 'react';

const Home = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Discover and Join Amazing Events
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore events from various organizations and register in seconds.
        </p>
        <img
          src="/images/home.png"
          alt="Event Illustration"
          className="mt-8 max-w-lg mx-auto"
        />
      </section>

      {/* Feature Cards */}
      <section className="py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <img src="/images/event-fotor-bg-removed.png" alt="Variety" className="w-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Variety of Events</h3>
          <p className="text-gray-500 text-sm mt-2">Find events from concerts to workshops all in one place.</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <img src="/images/registration-1.png" alt="Easy Registration" className="w-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Easy Registration</h3>
          <p className="text-gray-500 text-sm mt-2">Sign up in seconds and secure your spot instantly.</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <img src="/images/organization.png" alt="Verified Organizations" className="w-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Verified Organizations</h3>
          <p className="text-gray-500 text-sm mt-2">Join events hosted by trusted and verified organizers.</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <img src="/images/icons8-reminders-50.png" alt="Reminders" className="w-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Event Reminders</h3>
          <p className="text-gray-500 text-sm mt-2">Never miss an event with timely notifications.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
