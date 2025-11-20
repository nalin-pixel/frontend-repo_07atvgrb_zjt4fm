import { useState } from 'react'

function Navbar({ onAddClick }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">👗</span>
          <span className="font-bold text-xl tracking-tight">ReWear</span>
        </a>
        <div className="flex items-center gap-3">
          <a href="/test" className="hidden sm:inline-block text-sm text-gray-600 hover:text-gray-900">Status</a>
          <button
            onClick={onAddClick}
            className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-sm"
          >
            List an item
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
