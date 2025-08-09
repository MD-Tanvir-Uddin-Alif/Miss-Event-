import React from 'react'
import { useLocation } from 'react-router-dom'

const EventDetail = () => {
  const location = useLocation();
  const detail = location.state?.details;
  return (
    <div>
      <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4"><p class="text-[#141414] tracking-light text-[32px] font-bold leading-tight min-w-72">bjsdfbjk{detail.title}</p></div>
            <p className="text-[#141414] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Join us for a day of insightful talks, hands-on workshops, and networking opportunities with industry leaders and fellow tech enthusiasts. Explore the latest trends
              in software development, AI, and cybersecurity.
            </p>
            <h3 className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Event Details</h3>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbdbdb] py-5">
                <p className="text-neutral-500 text-sm font-normal leading-normal">Start Time</p>
                <p className="text-[#141414] text-sm font-normal leading-normal">2024-03-15 09:00 AM</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbdbdb] py-5">
                <p className="text-neutral-500 text-sm font-normal leading-normal">End Time</p>
                <p className="text-[#141414] text-sm font-normal leading-normal">2024-03-15 05:00 PM</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbdbdb] py-5">
                <p className="text-neutral-500 text-sm font-normal leading-normal">Location</p>
                <p className="text-[#141414] text-sm font-normal leading-normal">Innovation Center, 123 Tech Drive, San Francisco, CA</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbdbdb] py-5">
                <p className="text-neutral-500 text-sm font-normal leading-normal">Capacity</p>
                <p className="text-[#141414] text-sm font-normal leading-normal">500</p>
              </div>
            </div>
            <h3 className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">About the Event</h3>
            <p className="text-[#141414] text-base font-normal leading-normal pb-3 pt-1 px-4">
              This conference is designed for software developers, IT professionals, and anyone interested in the latest advancements in technology. Attendees will have the
              opportunity to learn from experts, participate in interactive sessions, and connect with peers. Topics covered include cloud computing, data science, and emerging
              technologies.
            </p>
            <div className="flex px-4 py-3 justify-start">
              <button
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#141414] text-neutral-50 text-sm font-bold leading-normal tracking-[0.015em]"
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