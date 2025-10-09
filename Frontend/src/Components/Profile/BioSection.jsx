import React from 'react'

const BioSection = ({isEditing,handleInputChange,tempUserData,userData}) => {
  return (
    <div className="px-6 py-6">
    <div className="flex items-center gap-2 mb-4">
      <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">About Me</h3>
    </div>
    {isEditing ? (
      <textarea
        value={tempUserData.bio}
        onChange={(e) => handleInputChange('bio', e.target.value)}
        rows="4"
        className="w-full text-gray-700 leading-relaxed border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
      />
    ) : (
      <p className="text-gray-600 leading-relaxed text-base">{userData.bio}</p>
    )}
  </div>
  )
}

export default BioSection
