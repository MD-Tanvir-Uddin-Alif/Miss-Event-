import React from 'react'

const EmailPass = () => {
  return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white text-black p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Email Address</h2>

                <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-black">Email</label>
                    <input
                    type="email"
                    className="mt-1 block w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div className="text-center mt-6">
                    <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-200"
                    >
                    send
                    </button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EmailPass