import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios';
import axiosPublic from '../../utils/axiospublic'

const EmailPass = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)
    try {
      await axiosPublic.post('/api/user/reset-password/request/', { email })
    // await axios.post('http://127.0.0.1:8000/api/user/reset-password/request/', { email })

      toast.success('Password reset email sent! Check your inbox.')
      setEmail('')
    } catch (error) {
      console.error(error)
      toast.error('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white text-black p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Email Address</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`bg-black text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailPass
