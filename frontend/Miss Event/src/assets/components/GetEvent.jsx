import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const GetEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const orgId = localStorage.getItem('organization_id');
        if (!orgId) {
          console.error("No organization_id found in localStorage");
          return;
        }

        const response = await axiosInstance.get(`/api/event/organization/${orgId}/events/`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="text-black min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white border border-gray-300 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <div className="flex gap-2">
                <button className="text-sm px-4 py-1 border border-black rounded-full hover:bg-black hover:text-white transition">
                  Edit
                </button>
                <button className="text-sm px-4 py-1 border border-black rounded-full hover:bg-black hover:text-white transition">
                  Delete
                </button>
              </div>
            </div>
            <ul className="text-sm space-y-1">
              <li><strong>Start:</strong> {event.start_time}</li>
              <li><strong>End:</strong> {event.end_time}</li>
              <li><strong>Location:</strong> {event.location}</li>
              <li><strong>Description:</strong> {event.description}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetEvent;
