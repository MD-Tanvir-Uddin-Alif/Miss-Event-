import React, { useEffect, useState } from 'react'
import axiosPublic from '../../utils/axiospublic'


const PubllicEvent = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosPublic.get('/api/event/public/')
        setEvents(res.data)
      } catch (err) {
        console.error('Error fetching events:', err)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="px-8 md:px-40 py-10 flex justify-center">
      <div className="w-full max-w-[960px]">
        <h2 className="text-3xl font-bold text-black mb-6">Upcoming Events</h2>

        <ul className="space-y-6">
          {events.map(event => (
            <li
              key={event.id}
              className="flex flex-col md:flex-row gap-6 p-4 "
            >
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-xl font-semibold text-black">{event.title}</h3>
                <p className="text-sm text-gray-700">{event.description}</p>
                <p className="text-sm text-gray-500">Location: {event.location}</p>
                <p className="text-sm text-gray-500">
                  {new Date(event.start_time).toLocaleString()} → {new Date(event.end_time).toLocaleString()}
                </p>
                <button className="w-fit mt-2 bg-gray-200 text-black text-sm px-4 py-1 rounded-md hover:bg-gray-300 transition">
                  View Details
                </button>
              </div>

              {event.banner ? (
                <div
                  className="w-full md:w-64 aspect-video bg-center bg-cover bg-no-repeat rounded-md"
                  style={{ backgroundImage: `url(${event.banner})` }}
                />
              ) : (
                <div className="w-full md:w-64 aspect-video bg-gray-100 flex items-center justify-center rounded-md text-sm text-gray-500">
                  No Image
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PubllicEvent
