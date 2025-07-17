import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav class="bg-white shadow sticky top-0 z-10">
            <div class="mx-auto flex items-center justify-between px-6 py-4">
                <div class="flex items-center space-x-3">
                <img class="h-10 w-10" src="./login-removebg-preview.png" alt="Logo" />
                <span class="text-black text-xl font-bold">Miss Event!</span>
                </div>

                <div class="flex items-center space-x-6">
                <a href="#" class="text-black font-semibold hover:underline">Home</a>
                <a href="#" class="text-black font-semibold hover:underline">Explore</a>
                </div>

                <div>
                <button class="rounded-md border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition">
                    Login
                </button>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar