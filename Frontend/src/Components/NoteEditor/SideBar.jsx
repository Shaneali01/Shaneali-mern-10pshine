import { Clock, Star, Tag,Briefcase, User, BookOpen } from 'lucide-react';
import React from 'react'

const SideBar = ({ isPinned, setIsPinned, category, setCategory, getCategoryColor,tags,tagInput,handleTagKeyPress,getWordCount,handleAddTag,getCharCount,setTagInput,removeTag }) => {
    const categories = [
        { id: 'work', label: 'Work', icon: Briefcase },
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'learning', label: 'Learning', icon: BookOpen }
      ];
  return (
    <div className="p-6 space-y-6">
    {/* Category Selection */}
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Category
      </label>
      <div className="space-y-2">
        {categories.map(cat => {
          const IconComponent = cat.icon;
          const isActive = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? `bg-gradient-to-r ${getCategoryColor(cat.id)} text-white shadow-sm`
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>

    {/* Pin Status */}
    <div>
      <button
        onClick={() => setIsPinned(!isPinned)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          isPinned
            ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        <Star className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
        {isPinned ? 'Pinned' : 'Pin Note'}
      </button>
    </div>

    {/* Tags */}
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Tags
      </label>
      <div className="space-y-2">
        {tags.map(tag => (
          <div
            key={tag}
            className="group flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm rounded-lg transition-colors duration-200"
          >
            <span className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              {tag}
            </span>
            <button
              onClick={() => removeTag(tag)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200"
            >
              <span className="text-lg">×</span>
            </button>
          </div>
        ))}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="Add tag..."
            className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={handleAddTag}
            className="px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium w-full sm:w-auto"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="pt-6 border-t border-gray-200 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Words</span>
        <span className="font-semibold text-gray-900">{getWordCount()}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Characters</span>
        <span className="font-semibold text-gray-900">{getCharCount()}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
        <Clock className="w-3.5 h-3.5" />
        <span>Auto-save enabled</span>
      </div>
    </div>
  </div>
  )
}

export default SideBar
