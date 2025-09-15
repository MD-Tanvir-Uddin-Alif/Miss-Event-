import React, { useEffect, useState } from 'react'
import axiosPublic from '../../utils/axiospublic'
import { useNavigate } from 'react-router-dom'

const PubllicEvent = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true) // 👈 loading state
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true) // start loading
        const res = await axiosPublic.get('/api/event/public/')
        setEvents(res.data)
      } catch (err) {
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false) // stop loading
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="px-8 md:px-40 py-10 flex justify-center">
      <div className="w-full max-w-[960px]">
        <h2 className="text-3xl font-bold text-black mb-6">Upcoming Events</h2>

        {/* 👇 Show loading until data arrives */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <button
              disabled
              className="px-6 py-2 text-sm font-medium bg-gray-200 text-gray-600 rounded-lg cursor-not-allowed flex items-center gap-2"
            >
              <svg
                className="animate-spin h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Loading Events...
            </button>
          </div>
        ) : (
          <ul className="space-y-6">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex flex-col md:flex-row gap-6 p-4"
              >
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-xl font-semibold text-black">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-700">{event.description}</p>
                  <p className="text-sm text-gray-500">
                    Location: {event.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.start_time).toLocaleString()} →{' '}
                    {new Date(event.end_time).toLocaleString()}
                  </p>
                  <button
                    onClick={() =>
                      navigate('/event/detail', { state: { details: event } })
                    }
                    className="w-fit mt-2 bg-gray-200 text-black text-sm px-4 py-1 rounded-md hover:bg-gray-300 transition"
                  >
                    View Details
                  </button>
                </div>

                {event.banner_url ? (
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
        )}
      </div>
    </div>
  )
}

export default PubllicEvent
