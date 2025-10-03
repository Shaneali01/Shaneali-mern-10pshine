import { Edit, LogOut, Save, X } from 'lucide-react'
import React from 'react'

const ActionButton = ({isEditing,handleEdit,handleLogout,handleSave,handleCancel}) => {
  return (
    <div className="px-6 py-6 bg-white border-t border-gray-100">
    <div className="flex flex-col sm:flex-row gap-3">
      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Save className="h-5 w-5" />
            <span>Save Changes</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all"
          >
            <X className="h-5 w-5" />
            <span>Cancel</span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleEdit}
            className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Edit className="h-5 w-5" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </>
      )}
    </div>
  </div>
  )
}

export default ActionButton
