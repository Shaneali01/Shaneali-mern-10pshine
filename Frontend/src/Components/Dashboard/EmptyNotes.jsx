import { Plus, Sparkles } from 'lucide-react'
import React from 'react'

const EmptyNotes = ({searchTerm, handleCreateNote}) => {
  return (
    <div className="text-center py-20">
    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
      <Sparkles className="w-10 h-10 text-blue-500" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-3">No notes found</h3>
    <p className="text-slate-500 mb-8 max-w-md mx-auto">
      {searchTerm ? 'Try adjusting your search terms or filters' : 'Start your journey by creating your first note'}
    </p>
    <button
      onClick={handleCreateNote}
      className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <Plus className="w-5 h-5 mr-2" />
      Create Your First Note
    </button>
  </div>
  )
}

export default EmptyNotes
