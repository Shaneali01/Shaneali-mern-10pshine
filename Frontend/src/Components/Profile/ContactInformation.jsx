import { Calendar, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const ContactInformation = ({userData,handleInputChange,tempUserData,isEditing}) => {
  return (
    <div className="px-6 py-6 bg-gray-50/50">
    <div className="flex items-center gap-2 mb-6">
      <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Contact Information</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Email */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-sm">
              <Mail className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={tempUserData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="text-gray-800 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1 border border-gray-300"
              />
            ) : (
              <p className="text-gray-800 font-medium text-sm break-all">{userData.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
              <Phone className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={tempUserData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="text-gray-800 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1 border border-gray-300"
              />
            ) : (
              <p className="text-gray-800 font-medium text-sm">{userData.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-sm">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={tempUserData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="text-gray-800 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1 border border-gray-300"
              />
            ) : (
              <p className="text-gray-800 font-medium text-sm">{userData.location}</p>
            )}
          </div>
        </div>
      </div>

      {/* Join Date */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Member Since</label>
            <p className="text-gray-800 font-medium text-sm">{userData.joinDate}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ContactInformation
