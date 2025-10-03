import React from 'react'

const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
    {/* Main gradient orbs */}
    <div className="absolute top-1/4 left-1/6 w-96 h-96 max-w-[50vw] max-h-[50vw] bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-blue-500/10 rounded-full blur-3xl animate-pulse opacity-60 md:w-80 md:h-80 sm:w-64 sm:h-64"></div>
    <div className="absolute bottom-1/4 right-1/6 w-[32rem] h-[32rem] max-w-[60vw] max-h-[60vw] bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-40 md:w-96 md:h-96 sm:w-72 sm:h-72"></div>
    <div className="absolute top-3/4 left-3/4 w-80 h-80 max-w-[40vw] max-h-[40vw] bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500 opacity-50 md:w-64 md:h-64 sm:w-48 sm:h-48"></div>

    {/* Moving particles */}
    <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce delay-300"></div>
    <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-pink-400/40 rounded-full animate-bounce delay-700"></div>
    <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-bounce delay-1000"></div>

    {/* Grid pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
  </div>
  )
}

export default Background
