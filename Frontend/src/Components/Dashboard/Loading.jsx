import React from 'react'

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-pulse">
        <div className="h-4 bg-slate-200 rounded-lg mb-4"></div>
        <div className="h-3 bg-slate-200 rounded mb-2"></div>
        <div className="h-3 bg-slate-200 rounded mb-4 w-3/4"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-slate-200 rounded-full w-16"></div>
          <div className="h-6 bg-slate-200 rounded w-20"></div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Loading
