import { Edit, User } from 'lucide-react'
import React from 'react'

const ProfileHeader = ({userData,handleImageChange,handleInputChange,tempUserData,isEditing}) => {
  return (
    <div className="relative px-6 py-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div className="absolute inset-0 bg-black/10"></div>
    <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6">
      {/* Profile Picture */}
      <div className="flex-shrink-0 relative group">
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/50 overflow-hidden">
          {userData.profileImage ? (
            <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="h-14 w-14 text-indigo-600" />
          )}
        </div>
        {isEditing && (
          <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Edit className="h-6 w-6 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Name and Role */}
      <div className="flex-grow min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={tempUserData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="text-3xl font-bold text-white mb-2 w-full bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-3 py-2 placeholder-white/70"
          />
        ) : (
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{userData.name}</h2>
        )}
        
        {isEditing ? (
          <input
            type="text"
            value={tempUserData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className="text-white/90 font-medium text-lg w-full bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-3 py-2 placeholder-white/70"
          />
        ) : (
          <p className="text-white/90 font-medium text-lg drop-shadow">{userData.role}</p>
        )}
      </div>
    </div>
  </div>
  )
}

export default ProfileHeader
