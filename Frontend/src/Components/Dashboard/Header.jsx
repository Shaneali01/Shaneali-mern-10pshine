import { ChevronDown, Link, LogOut, Plus, Settings, Sparkles, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Lib/axios';

const Header = ({ handleCreateNote, handleLogout }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`user/Profile/${JSON.parse(localStorage.getItem('userId'))}`, { withCredentials: true });
        setUser(response.data.user);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to localStorage if API fails
        const fallbackUser = JSON.parse(localStorage.getItem('user')) || {};
        setUser(fallbackUser);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile');
    setIsProfileDropdownOpen(false);
  };

  if (loading) {
    return (
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0">
          <div className="flex justify-between items-center h-16">
            {/* App Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  NoteFlow
                </h1>
                <p className="text-xs text-slate-500 -mt-1">Your thoughts, organized</p>
              </div>
            </div>
            
            {/* Create New Note Button and Profile Dropdown */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreateNote}
                className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </button>

              {/* Profile Placeholder */}
              <div className="flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const userImage = user?.image;

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0">
        <div className="flex justify-between items-center h-16">
          {/* App Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                NoteFlow
              </h1>
              <p className="text-xs text-slate-500 -mt-1">Your thoughts, organized</p>
            </div>
          </div>
          
          {/* Create New Note Button and Profile Dropdown */}
          <div className="flex items-center space-x-4">
            {/* Create New Note Button */}
            <button
              onClick={handleCreateNote}
              className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200"
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full shadow-md object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">{user?.name || ''}</p>
                    <p className="text-xs text-slate-500">{user?.email || ''}</p>
                  </div>
                  
                  <button
                    onClick={handleEditProfile}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Edit Profile
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;