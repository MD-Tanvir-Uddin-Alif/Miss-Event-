import React from 'react'

const ResetPassword = () => {
  return (
    <div className="bg-gray-50 text-white flex items-center justify-center min-h-screen">
        <div className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

            <form>
                <div className="mb-4">
                    <label for="old-password" className="block text-sm font-medium mb-2">Old Password</label>
                    <input typen="password" id="old-password" name="old-password" required
                        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black" />
                </div>

                <div className="mb-4">
                    <label for="new-password" className="block text-sm font-medium mb-2">New Password</label>
                    <input type="password" id="new-password" name="new-password" required
                        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black" />
                </div>

                <div className="mb-6">
                    <label for="confirm-password" className="block text-sm font-medium mb-2">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" required
                        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black" />
                </div>

                <button type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200">
                    Update Password
                </button>
            </form>
        </div>
    </div>
  )
}

export default ResetPassword