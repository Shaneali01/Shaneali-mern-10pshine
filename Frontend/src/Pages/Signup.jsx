import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Watermarks from "../Components/Common/Watermarks"
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Signup/Header';
import ProgessIndicator from '../Components/Signup/ProgessIndicator';
import BasicInfo from '../Components/Signup/BasicInfo';
import PasswordSection from '../Components/Signup/PasswordSection';
import AdditionalDetails from '../Components/Signup/AdditionalDetails';
import NavigationButtons from '../Components/Signup/NavigationButtons';
import { axiosInstance } from '../Lib/axios';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    profession: '',
    image: null,
  });
  const navigate=useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setFormData({
        ...formData,
        image: file,
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setImagePreview(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      console.log("working")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('password', formData.password);
      submitData.append('phone', formData.phone);
      submitData.append('address', formData.address);
      submitData.append('profession', formData.profession);
      
      // Append image if exists
      if (formData.image) {
        submitData.append('image', formData.image);
      }
      console.log(formData)
      
      const response = await axiosInstance.post('/user/register', submitData);
      const data = response.data;
      console.log(data)
      
      const successToastId = toast.success('Signup successful! Please login now.');
      
      // Delay redirect to allow toast to be visible
      setTimeout(() => {
        toast.dismiss(successToastId); // Dismiss the success toast before redirect
        navigate('/');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          address: '',
          profession: '',
          image: null,
        });
      }, 1500);// Adjust delay as needed (e.g., 3000 for 3 seconds)
      
      // Handle success (redirect, show message, etc.)
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      console.error('Signup failed:', errorMessage);
      toast.error(`Signup failed: ${errorMessage}`);
      // Handle error (show error message)
    } finally {
      setIsLoading(false);
    }
  };

  const isStep1Valid = formData.name && formData.email;
  const isStep2Valid = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>

        <div className="relative backdrop-blur-xl rounded-2xl p-6 w-full max-w-lg min-w-[24rem] shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-2xl my-8">
          {/* Header */}
          <Header/>

          {/* Progress Indicator */}
          <ProgessIndicator currentStep={currentStep}/>

          {/* Step Labels */}
          <div className="text-center mb-6">
            <p className="text-gray-300 text-sm">
              {currentStep === 1 && 'Basic Information'}
              {currentStep === 2 && 'Security'}
              {currentStep === 3 && 'Additional Details'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <BasicInfo formData={formData} handleInputChange={handleInputChange}/>
            )}

            {/* Step 2: Password */}
            {currentStep === 2 && (
              <PasswordSection formData={formData} handleInputChange={handleInputChange} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword}  />
            )}

            {/* Step 3: Additional Details */}
            {currentStep === 3 && (
              <AdditionalDetails 
                imagePreview={imagePreview} 
                handleImageUpload={handleImageChange} 
                removeImage={removeImage} 
                formData={formData} 
                handleImageChange={handleImageChange} 
                handleInputChange={handleInputChange}
                isLoading={isLoading}
                handleBack={handleBack}
              />
            )}

            {/* Navigation Buttons - Only for steps 1 and 2 */}
            {currentStep < 3 && (
              <NavigationButtons currentStep={currentStep} handleBack={handleBack} handleNext={handleNext} isStep1Valid={isStep1Valid} isStep2Valid={isStep2Valid} />
            )}
          </form>

          {/* Divider - Only show on step 1 */}
        </div>
        {currentStep === 1 && (
             <div className="absolute bottom-4  left-1/2 transform -translate-x-1/2">
             <div className="bg-black/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10 text-center">
               <span className="text-gray-300 text-sm mr-2">
                 Already have an account?
               </span>
               <Link to="/login"
                 type="button"
                 className="text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 relative group"
               >
                 Sign In
                 <span className="absolute inset-x-0 bottom-0 h-px bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
               </Link>
             </div>
           </div>
          )}
        <Watermarks/>
      </div>
    </>
  );
};

export default Signup;