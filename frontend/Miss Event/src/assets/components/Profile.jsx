import React from 'react'

const Profile = () => {
  return (
    <div>
        <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">

            <div class="flex items-center space-x-6 mb-8">
              <img
                class="h-24 w-24 rounded-full object-cover border-4 border-black"
                src="https://i.pravatar.cc/150?img=5"
                alt="User Profile"
              />
              <div>
                <h2 class="text-2xl font-semibold text-black">JohnDoe99</h2>
                <p class="text-sm text-gray-500">Joined: January 2025</p>
              </div>
            </div>

            <div class="space-y-4 text-black">
              <div>
                <label class="block text-sm font-medium text-gray-500">First Name</label>
                <p class="mt-1">John</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Last Name</label>
                <p class="mt-1">Doe</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Email</label>
                <p class="mt-1">john@example.com</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Phone</label>
                <p class="mt-1">+880 1234 567890</p>
              </div>
            </div>

            <div class="mt-8 flex justify-end space-x-4">
              <button
                class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Edit Profile
              </button>
              <button
                class="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition"
              >
                Change Password
              </button>
            </div>

          </div>
        </div>

    </div>
  )
}

export default Profile