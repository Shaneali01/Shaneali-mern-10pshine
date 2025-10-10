import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

const NavigationButtons = ({ currentStep, handleBack, handleNext, isStep1Valid, isStep2Valid}) => {
  return (
    <div className="flex space-x-3 pt-2">
    {currentStep > 1 && (
      <button
        type="button"
        onClick={handleBack}
        className="flex-1 bg-white/5 border border-gray-300/20 text-white py-2 px-4 rounded-lg font-semibold hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 flex items-center justify-center"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>
    )}
    
    {currentStep < 3 && (
      <button
        type="button"
        onClick={handleNext}
        disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
        className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
      >
        Next
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    )}
    
    {currentStep === 3 && (
      <button
        type="submit"
        className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Create Account
      </button>
    )}
  </div>
  )
}

export default NavigationButtons
