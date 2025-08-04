import React from 'react'

const CreateEvent = () => {
  return (
    <div class="min-h-screen flex items-center justify-center p-6">
        <div class="bg-white w-full max-w-xl rounded-2xl shadow border border-black p-8">
            <h2 class="text-2xl font-bold text-black mb-6 text-center uppercase tracking-wide">Create New Event</h2>
    
            <form class="space-y-5">
            <div>
                <label class="block text-sm font-semibold text-black mb-1">Title</label>
                <input type="text" placeholder="Event Title" class="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black bg-white text-black placeholder-gray-400" />
            </div>

            <div>
                <label class="block text-sm font-semibold text-black mb-1">Location</label>
                <input type="text" placeholder="Event Location" class="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black bg-white text-black placeholder-gray-400" />
            </div>

            <div>
                <label class="block text-sm font-semibold text-black mb-1">Description</label>
                <textarea rows="4" placeholder="Event Description" class="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black bg-white text-black placeholder-gray-400"></textarea>
            </div>

            <div>
                <label class="block text-sm font-semibold text-black mb-1">Start Time</label>
                <input type="datetime-local" class="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black bg-white text-black" />
            </div>

            <div>
                <label class="block text-sm font-semibold text-black mb-1">End Time</label>
                <input type="datetime-local" class="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black bg-white text-black" />
            </div>

            <div class="pt-4">
                <button type="submit" class="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200">
                Create Event
                </button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default CreateEvent