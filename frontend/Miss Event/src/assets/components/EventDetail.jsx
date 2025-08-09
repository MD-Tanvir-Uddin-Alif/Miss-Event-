import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EventDetail = () => {
  const location = useLocation();
  const detail = location.state?.details;
  const navigate = useNavigate();

  if (!detail) {
    return <div className="p-4 text-red-600">No event details available.</div>;
  }

  return (
    <div>
      <div className="px-40 flex flex-col flex-1 justify-center py-5 max-w-[960px] mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black w-fit"
        >
          ← Back
        </button>

        <div className="layout-content-container flex flex-col flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#141414] tracking-light text-[32px] font-bold leading-tight min-w-72">
              {detail.title}
            </p>
          </div>

          <p className="text-[#141414] text-base font-normal leading-normal pb-3 pt-1 px-4">
            {detail.description}
          </p>

          <h3 className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Event Details
          </h3>

          <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbdbdb] py-5">
              <p className="text-neutral-500 text-sm font-normal leading-normal">Start Time</p>
              <p className="text-[#141414] text-sm font-normal leading-normal">
                {new Date(detail.start_time).toLocaleString()}
              </p>
            </div>

            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbdbdb] py-5">
              <p className="text-neutral-500 text-sm font-normal leading-normal">End Time</p>
              <p className="text-[#141414] text-sm font-normal leading-normal">
                {new Date(detail.end_time).toLocaleString()}
              </p>
            </div>

            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbdbdb] py-5">
              <p className="text-neutral-500 text-sm font-normal leading-normal">Location</p>
              <p className="text-[#141414] text-sm font-normal leading-normal">{detail.location}</p>
            </div>

            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbdbdb] py-5">
              <p className="text-neutral-500 text-sm font-normal leading-normal">Capacity</p>
              <p className="text-[#141414] text-sm font-normal leading-normal">{detail.capacity}</p>
            </div>
          </div>

          <h3 className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            About the Event
          </h3>

          <p className="text-[#141414] text-base font-normal leading-normal pb-3 pt-1 px-4">
            {detail.description}
          </p>

          <div className="flex px-4 py-3 justify-start">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#141414] text-neutral-50 text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Register Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
