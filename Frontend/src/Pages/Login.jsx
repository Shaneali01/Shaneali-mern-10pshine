import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import ToggleButton from '../Components/Common/Auth/ToggleButton';
import Watermarks from '../Components/Common/Watermarks';
import Divider from '../Components/Common/Auth/Divider';
import SocialIcons from '../Components/Common/Auth/SocialIcons';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 flex items-center justify-center p-4 relative overflow-hidde'>
 <div className="relative  backdrop-blur-xl rounded-2xl p-6 w-full max-w-lg min-w-[24rem] shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl mb-2">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">
          Welcome to <span className="text-purple-300">NoteFlow</span>
        </h1>
        <p className="text-gray-200 text-sm mt-1">Access your account</p>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="block w-full pl-10 pr-3 py-2 bg-white/5 border border-gray-300/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="block w-full pl-10 pr-12 py-2 bg-white/5 border border-gray-300/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-400 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-gray-300 hover:text-purple-400 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Sign In
        </button>
      </form>
      <Divider/>
     <SocialIcons/>
    </div>
    <ToggleButton/>
    <Watermarks/>
    </div>
   
  );
};

export default Login;