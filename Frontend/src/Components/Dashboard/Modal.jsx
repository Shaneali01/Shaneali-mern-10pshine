import { Calendar, Clock, Edit3, Star, Tag, X } from 'lucide-react'
import React from 'react'

const Modal = ({selectedNote, handleEditNote,handleCloseModal,formatDate,getCategoryColor,togglePin}) => {
  return (
    <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl relative z-10">
    {/* Modal Header */}
    <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="flex items-center space-x-3">
        {/* Pin indicator */}
        {selectedNote.isPinned && (
          <div className="p-1.5 bg-yellow-100 rounded-full">
            <Star className="w-4 h-4 text-yellow-600 fill-current" />
          </div>
        )}
        {/* Category badge */}
        <span className={`inline-block px-3 py-1.5 text-sm font-semibold rounded-full border ${getCategoryColor(selectedNote.category)}`}>
          {selectedNote.category}
        </span>
        {/* Last updated info */}
        <div className="text-sm text-slate-500">
          Updated {formatDate(selectedNote.updatedAt)}
        </div>
      </div>
      
      {/* Modal action buttons */}
      <div className="flex items-center space-x-2">
        {/* Edit button */}
        <button
          onClick={() => handleEditNote(selectedNote.id)}
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          title="Edit note"
        >
          <Edit3 className="w-5 h-5" />
        </button>
        {/* Close button */}
        <button
          onClick={handleCloseModal}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* Modal Body */}
    <div className="p-6 max-h-[70vh] overflow-y-auto">
      {/* Note Title */}
      <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
        {selectedNote.title}
      </h1>

      {/* Tags */}
      {selectedNote.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedNote.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-lg font-medium"
            >
              <Tag className="w-3 h-3 mr-1.5" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Full Note Content */}
      <div className="prose prose-slate max-w-none">
        <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-base">
          {selectedNote.content}
        </pre>
      </div>
    </div>

    {/* Modal Footer */}
    <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
      {/* Note metadata */}
      <div className="flex items-center space-x-4 text-sm text-slate-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Created {formatDate(selectedNote.createdAt)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Updated {formatDate(selectedNote.updatedAt)}</span>
        </div>
      </div>
      
      {/* Footer action buttons */}
      <div className="flex items-center space-x-2">
        {/* Pin/Unpin button */}
        <button
          onClick={() => togglePin(selectedNote.id)}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            selectedNote.isPinned
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
          }`}
        >
          <Star className={`w-4 h-4 mr-2 ${selectedNote.isPinned ? 'fill-current' : ''}`} />
          {selectedNote.isPinned ? 'Unpin' : 'Pin'}
        </button>
        
        {/* Edit Note button */}
        <button
          onClick={() => handleEditNote(selectedNote.id)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Note
        </button>
      </div>
    </div>
  </div>
  )
}

export default Modal
