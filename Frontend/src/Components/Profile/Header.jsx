import { ArrowLeft, Sparkles } from 'lucide-react'
import React from 'react'

const Header = () => {
    const handleBack = () => {
        alert('Going back to dashboard... (You will implement navigation here)');
      };
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <button 
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-all font-medium group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-indigo-600" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">NoteFlow</h1>
        </div>
        <div className="w-32"></div>
      </div>
    </div>
  </header>
  )
}

export default Header
