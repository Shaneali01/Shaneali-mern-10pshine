import { Search } from 'lucide-react'
import React from 'react'

const SearchAndFilter = ({searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories,notes, sortedNotes}) => {
  return (
    <div className="mb-8 space-y-4">
    {/* Search Input */}
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search notes, tags, or content..."
        className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-slate-700 placeholder-slate-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Category Filter Buttons */}
    {notes.length >0 && (
      <div className="flex flex-wrap gap-3">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
              : 'bg-white/60 backdrop-blur-sm text-slate-600 hover:bg-white/80 border border-slate-200/50 hover:shadow-md hover:scale-102'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
    )}
    
  </div>

  )
}

export default SearchAndFilter
