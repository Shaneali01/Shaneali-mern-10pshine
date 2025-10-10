import React from 'react'

const ProgessIndicator = ({ currentStep}) => {
  return (
    <div className="flex items-center justify-center mb-6">
    <div className="flex items-center space-x-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
        currentStep >= 1 ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' : 'bg-white/10 text-gray-400'
      }`}>
        1
      </div>
      <div className={`w-12 h-1 rounded ${currentStep >= 2 ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-white/10'}`}></div>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
        currentStep >= 2 ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' : 'bg-white/10 text-gray-400'
      }`}>
        2
      </div>
      <div className={`w-12 h-1 rounded ${currentStep >= 3 ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-white/10'}`}></div>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
        currentStep >= 3 ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' : 'bg-white/10 text-gray-400'
      }`}>
        3
      </div>
    </div>
  </div>
  )
}

export default ProgessIndicator
