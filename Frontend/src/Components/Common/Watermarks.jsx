import { Sparkles } from 'lucide-react'
import React from 'react'

const Watermarks = () => {
  return (
    <div className="absolute top-8 left-8">
        <div className="flex items-center space-x-2 text-white/60 hover:text-white/80 transition-colors duration-300">
          <Sparkles className="h-6 w-6 animate-pulse" />
          <span className="font-semibold text-lg">NoteFlow</span>
        </div>
      </div>
  )
}

export default Watermarks
