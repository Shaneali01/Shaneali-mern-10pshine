import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, ArrowLeft, Sparkles, Eye, EyeOff } from 'lucide-react';
import ToggleButton from '../Components/Common/Auth/ToggleButton';
import Watermarks from '../Components/Common/Watermarks';
import Divider from '../Components/Common/Auth/Divider';
import SocialIcons from '../Components/Common/Auth/SocialIcons';
import { axiosInstance } from '../Lib/axios';
import ClipLoader from 'react-spinners/ClipLoader';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/user/forgot-password', { email });
      setSubmitted(true);
      toast.success('Email sent! Check your inbox for the reset link.');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      toast.error(`Failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>
        <div className="relative backdrop-blur-xl rounded-2xl p-6 w-full max-w-lg min-w-[24rem] shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-2xl">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 mb-4 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Login</span>
          </button>
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl mb-2 mx-auto">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Check Your Email
            </h1>
            <p className="text-gray-200 text-sm mt-1">We've sent a password reset link to {email}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Back to Login
          </button>
        </div>
        <ToggleButton />
        <Watermarks />
        <Toaster />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>
      <div className="relative backdrop-blur-xl rounded-2xl p-6 w-full max-w-lg min-w-[24rem] shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-2xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 mb-4 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl mb-2 mx-auto">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Forgot Password?
          </h1>
          <p className="text-gray-200 text-sm mt-1">Enter your email to reset your password</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="block w-full pl-10 pr-3 py-2 bg-white/5 border border-gray-300/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <ClipLoader color="#ffffff" size={20} />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
        <Divider />
        <SocialIcons />
      </div>
      <ToggleButton />
      <Watermarks />
      <Toaster />
    </div>
  );
};

export default ForgotPassword;