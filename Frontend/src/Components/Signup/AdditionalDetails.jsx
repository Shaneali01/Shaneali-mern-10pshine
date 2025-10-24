import { Briefcase, MapPin, Phone, Camera, X, ArrowLeft } from 'lucide-react'
import React from 'react'
import { ClipLoader } from 'react-spinners'; // Make sure to install react-spinners: npm install react-spinners

const AdditionalDetails = ({ imagePreview, removeImage, handleBack, formData, handleInputChange, handleImageChange, isLoading, onBack }) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-2 animate-fadeIn">
            {/* Image Upload */}
            <div className="flex flex-col items-center space-y-1 mb-5">
              {imagePreview ? (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-purple-400 shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-all shadow-lg hover:scale-110"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 border-2 border-dashed border-purple-400/40 flex items-center justify-center hover:border-purple-400/60 transition-all cursor-pointer">
                  <Camera className="w-8 h-8 text-purple-400" />
                </div>
              )}
              <label className="cursor-pointer group">
                <span className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors block text-center">
                  {imagePreview ? ' Change Photo' : ' Upload Photo (Optional)'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Phone and Profession Fields - Side by Side */}
            <div className="flex space-x-4">
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone (Optional)"
                  className="block w-full pl-10 pr-3 py-1 bg-white/5 border border-gray-300/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  placeholder="Profession (Optional)"
                  maxLength="100"
                  className="block w-full pl-10 pr-3 py-1 bg-white/5 border border-gray-300/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Address Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address (Optional)"
                className="block w-full pl-10 pr-3 py-1 bg-white/5 border border-gray-300/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-white/5 border border-gray-300/20 text-white py-1 px-4 rounded-lg font-semibold hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <ClipLoader color="white" size={16} />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </div>
          </div>
  )
}

export default AdditionalDetails