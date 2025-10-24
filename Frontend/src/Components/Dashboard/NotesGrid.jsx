import { Clock, Edit3, Pin, Tag, Trash2 } from 'lucide-react';
import React from 'react'

const NotesGrid = ({sortedNotes, handleViewNote, handleEditNote, handleDeleteNote,getCategoryColor,formatDate,togglePin}) => {
  
  // Helper function to strip HTML tags and get plain text preview
  const getTextPreview = (htmlContent, maxLength = 150) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedNotes.map(note => (
        <div
          key={note._id}
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
                    <div className="p-1 bg-indigo-100 rounded-full">
                      <Pin className="w-3 h-3 text-indigo-600 fill-current" />
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

            {/* Content Preview - FIXED: Now shows plain text preview instead of HTML */}
            <p className="text-slate-600 text-sm line-clamp-3 mb-5 leading-relaxed">
              {getTextPreview(note.content)}
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
                    console.log(note)
                    togglePin(note._id);
                  }}
                  className="p-1.5 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                  title={note.isPinned ? 'Unpin note' : 'Pin note'}
                >
                  <Pin className={`w-4 h-4 ${note.isPinned ? 'text-indigo-600 fill-current' : 'text-slate-400'}`} />
                </button>
                
                {/* Edit button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(note)
                    handleEditNote(note._id);
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
                    handleDeleteNote(note._id);
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