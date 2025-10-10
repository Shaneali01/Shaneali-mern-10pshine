import { Search, Filter, X, Hash } from 'lucide-react'
import React from 'react'

const SearchAndFilter = ({searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories, notes, sortedNotes}) => {
  
  // Get count for each category
  const getCategoryCount = (category) => {
    if (category === 'all') return notes.length;
    return notes.filter(note => note.category === category).length;
  };

  // Category colors for visual distinction
  const getCategoryColor = (category) => {
    const colors = {
      all: 'from-slate-600 to-slate-700',
      personal: 'from-blue-600 to-blue-700',
      work: 'from-purple-600 to-purple-700',
      ideas: 'from-amber-500 to-orange-600',
      todo: 'from-green-600 to-emerald-700',
    };
    return colors[category] || 'from-gray-600 to-gray-700';
  };

  return (
    <div className="mb-4">
      {/* Unified Search and Filter Section */}
      <div className="relative">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
        
        <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-slate-200/50">
          {/* Search Input */}
          <div className="relative group mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity duration-500 -z-10"></div>
            
            <div className="relative flex items-center">
              <div className="absolute left-4 flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg group-focus-within:scale-110 transition-transform duration-300 z-10">
                <Search className="w-4 h-4 text-white" />
              </div>
              
              <input
                type="text"
                placeholder="Search by title, content, or tags..."
                className="w-full pl-16 pr-12 py-3.5 bg-slate-50/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 text-slate-800 placeholder-slate-400 font-medium shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 p-1.5 hover:bg-red-50 bg-slate-100 rounded-lg transition-all duration-200 group/clear"
                  title="Clear search"
                >
                  <X className="w-4 h-4 text-slate-500 group-hover/clear:text-red-500 transition-colors" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Section */}
          {notes.length > 0 && (
            <>
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-3 p-2 pl-0 bg-white/90 backdrop-blur-xl  rounded-2xl border border-slate-200/50">
                <div className="flex items-center gap-2.5 ">
                  <div className="flex items-center justify-center ml-3.5 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                    <Filter className="w-4 h-4 text-white " />
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-slate-800">Filter Categories</h3>
                    <p className="text-xs text-slate-500">Select a category to filter notes</p>
                  </div>
                </div>
                
                {/* Search Stats */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                  <Hash className="w-3.5 h-3.5 text-blue-600" />
                  {searchTerm ? (
                    <span className="text-slate-700 text-xs">
                      <span className="font-bold text-blue-600">{sortedNotes.length}</span> result{sortedNotes.length !== 1 ? 's' : ''} found
                    </span>
                  ) : (
                    <span className="text-slate-700 text-xs">
                      <span className="font-bold text-blue-600">{sortedNotes.length}</span> / {notes.length} note{notes.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                  const count = getCategoryCount(category);
                  const isSelected = selectedCategory === category;
                  const gradientColor = getCategoryColor(category);
                  
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`group relative overflow-hidden px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                        isSelected
                          ? 'text-white shadow-xl'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200 hover:border-slate-300 shadow-md'
                      }`}
                      style={isSelected ? {
                        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      } : {}}
                    >
                      {isSelected && (
                        <>
                          <div className={`absolute inset-0 bg-gradient-to-r ${gradientColor}`}></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50"></div>
                        </>
                      )}
                      
                      <span className="relative flex items-center gap-2">
                        <span className="capitalize tracking-wide">
                          {category}
                        </span>
                        
                        {/* Count Badge */}
                        <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md text-xs font-black transition-all duration-300 ${
                          isSelected
                            ? 'bg-white/30 backdrop-blur-sm text-white shadow-lg'
                            : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                        }`}>
                          {count}
                        </span>
                      </span>
                      
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/50 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilter