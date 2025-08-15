import React from 'react';

const Home = () => {
  return (
    <div className="font-sans">
      <section className="bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 py-16 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
    
          <div className="flex-1 flex justify-center">
            <img
              src="/images/home.png"
              alt="Event Illustration"
              className="max-w-md w-full"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">
              Discover and Join Amazing Events
            </h1>
            <p className="text-lg text-gray-600 max-w-md mb-6 animate-fadeIn delay-200">
              Explore events from various organizations and register in seconds.
            </p>
            <button className="px-6 py-3 bg-black text-white rounded-lg shadow">
              Browse Events
            </button>
          </div>
        </div>
      </section>


      <section className="py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {[
          {
            img: "/images/event-fotor-bg-removed.png",
            title: "Variety of Events",
            text: "Find events from concerts to workshops all in one place.",
            color: "from-pink-100 to-pink-50"
          },
          {
            img: "/images/registration-1.png",
            title: "Easy Registration",
            text: "Sign up in seconds and secure your spot instantly.",
            color: "from-blue-100 to-blue-50"
          },
          {
            img: "/images/organization.png",
            title: "Verified Organizations",
            text: "Join events hosted by trusted and verified organizers.",
            color: "from-green-100 to-green-50"
          },
          {
            img: "/images/icons8-reminders-50.png",
            title: "Event Reminders",
            text: "Never miss an event with timely notifications.",
            color: "from-yellow-100 to-yellow-50"
          }
        ].map((feature, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-b ${feature.color} shadow-lg rounded-2xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300`}
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="w-20 mx-auto mb-6 drop-shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 text-sm mt-3">{feature.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
