import React, { useState } from 'react';
import { User, Mail, Calendar, MapPin, Phone, Briefcase, LogOut, Edit, ArrowLeft, Save, X, Sparkles } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    role: 'Software Developer Intern',
    joinDate: 'September 2024',
    bio: 'Passionate about creating intuitive applications and learning new technologies. Currently working on a notes management system during my internship.',
    profileImage: null
  });

  const [tempUserData, setTempUserData] = useState({...userData});

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      alert('Logging out... (You will implement actual logout logic here)');
    }
  };

  const handleBack = () => {
    alert('Going back to dashboard... (You will implement navigation here)');
  };

  const handleEdit = () => {
    setTempUserData({...userData});
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({...tempUserData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUserData({...userData});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempUserData({
      ...tempUserData,
      [field]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUserData({
          ...tempUserData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-all font-medium group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">NoteFlow</h1>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Profile Header with Gradient */}
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

              {/* Bio Section */}
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

              {/* Contact Information */}
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

              {/* Action Buttons */}
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
            </div>
          </div>

          {/* Stats Section */}
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
        </div>
      </main>
    </div>
  );
}