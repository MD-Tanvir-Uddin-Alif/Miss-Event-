import React from 'react'

const Login = () => {
  return (
    <div>
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white text-black p-8 rounded-2xl shadow-lg w-full max-w-md">
    <h2 class="text-3xl font-bold mb-6 text-center">Login</h2>

    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-black">Username</label>
        <input
          type="text"
          name="username"
          required
          class="mt-1 block w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-black">Password</label>
        <input
          type="password"
          name="password"
          required
          class="mt-1 block w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div class="text-right mt-1">
          <a href="/forgot-password" class="text-sm text-black hover:underline">Forgot password?</a>
        </div>
      </div>

      <div class="text-center mt-6">
        <button
          type="submit"
          class="bg-black text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-200"
        >
          Login
        </button>
      </div>

      <div class="flex flex-col items-center text-center mt-4">
        <p class="text-sm text-black">Don't have an account?</p>
        <a href="/register" class="text-sm text-black hover:underline">Register Yourself</a>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}

export default Login