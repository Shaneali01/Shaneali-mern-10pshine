import { Briefcase, Calendar, User } from 'lucide-react'
import React from 'react'

const Stats = () => {
  return (
    <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Activity Overview</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Projects</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">12</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Notes Created</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">45</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Months Active</p>
                <p className="text-xs text-gray-500">Engagement</p>
              </div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">3</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Stats
