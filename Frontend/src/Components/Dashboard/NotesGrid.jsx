import { Clock, Edit3, Star, Tag, Trash2 } from 'lucide-react';
import React from 'react'

const NotesGrid = ({sortedNotes, handleViewNote, handleEditNote, handleDeleteNote,getCategoryColor,formatDate,togglePin}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {sortedNotes.map(note => (
      <div
        key={note.id}
        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-slate-200/50 hover:border-slate-300/50 transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 hover:bg-white/80"
        onClick={() => handleViewNote(note)}
      >
        <div className="p-6">
          {/* Note Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {/* Pin indicator and category badge */}
              <div className="flex items-center space-x-2 mb-3">
                {note.isPinned && (
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <Star className="w-3 h-3 text-yellow-600 fill-current" />
                  </div>
                )}
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(note.category)}`}>
                  {note.category}
                </span>
              </div>
              {/* Note Title */}
              <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                {note.title}
              </h3>
            </div>
          </div>

          {/* Content Preview */}
          <p className="text-slate-600 text-sm line-clamp-3 mb-5 leading-relaxed">
            {note.content}
          </p>

          {/* Tags Display */}
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {note.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 bg-slate-100/80 text-slate-600 text-xs rounded-lg font-medium"
                >
                  <Tag className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="text-xs text-slate-400 px-2 py-1">
                  +{note.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Note Footer */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
            {/* Last updated info */}
            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Updated {formatDate(note.updatedAt)}</span>
            </div>
            
            {/* Action buttons (visible on hover) */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Pin/Unpin button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(note.id);
                }}
                className="p-1.5 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
                title={note.isPinned ? 'Unpin note' : 'Pin note'}
              >
                <Star className={`w-4 h-4 ${note.isPinned ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
              </button>
              
              {/* Edit button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditNote(note.id);
                }}
                className="p-1.5 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                title="Edit note"
              >
                <Edit3 className="w-4 h-4 text-slate-400 hover:text-blue-600" />
              </button>
              
              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNote(note.id);
                }}
                className="p-1.5 rounded-lg hover:bg-red-100 transition-colors duration-200"
                title="Delete note"
              >
                <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default NotesGrid
