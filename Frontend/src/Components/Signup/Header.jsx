import { Sparkles } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl mb-2">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">
          Join <span className="text-purple-300">NoteFlow</span>
        </h1>
        <p className="text-gray-200 text-sm mt-1">Create your account</p>
      </div>
  )
}

export default Header
