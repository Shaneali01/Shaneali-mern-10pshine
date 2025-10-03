import React from 'react'
import { Link } from 'react-router-dom'

const ToggleButton = () => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
    <div className="bg-black/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10 text-center">
      <span className="text-gray-300 text-sm mr-2">
        Don't have an account?
      </span>
      <Link to={'/signup'}
        type="button"
        className="text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 relative group"
      >
        Sign Up
        <span className="absolute inset-x-0 bottom-0 h-px bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      </Link>
    </div>
  </div>
  )
}

export default ToggleButton
