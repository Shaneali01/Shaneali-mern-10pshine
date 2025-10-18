import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Header from "../Components/Profile/Header";
import ContactInformation from "../Components/Profile/ContactInformation";
import ActionButton from "../Components/Profile/ActionButton";
import BioSection from "../Components/Profile/BioSection";
import Stats from "../Components/Profile/Stats";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import { axiosInstance } from "../Lib/axios";
import BarLoader from 'react-spinners/BarLoader';

export default function ProfilePage({handleLogout}) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    joinDate: "",
    bio: "",
    profileImage: null,
  });

  const [tempUserData, setTempUserData] = useState({ ...userData });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        let userId = JSON.parse(localStorage.getItem('userId')); // Assume you store userId after login
        if (!userId) {
          setError("User ID not found. Please log in again.");
          return;
        }
        const response = await axiosInstance.get(`/user/${userId}`, {withCredentials: true});
        console.log(response);
        if (response.status === 200) {
          const parsed = response.data.user;
          console.log(parsed);
          const formatDate = (dateString) => {
            if (!dateString) return '';
            return new Date(dateString).toISOString().split('T')[0];
          };
          const userDataToSet = {
            name: parsed.name || "",
            email: parsed.email || "",
            phone: parsed.phone || "",
            location: parsed.address || "",
            role: parsed.profession || "",
            joinDate: formatDate(parsed.joinedAt),
            bio: parsed.bio || "", // If backend has bio, use it
            profileImage: parsed.image || null,
          };
          setUserData(userDataToSet);
          setTempUserData({ ...userDataToSet });
          // Optional: cache in localStorage
          localStorage.setItem('user', JSON.stringify(parsed));
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <BarLoader color="#6366f1" height={4} width={200} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  

  const confirmLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    });

    if (result.isConfirmed) {
      handleLogout();
    }
  };

  const handleEdit = () => {
    setTempUserData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (!userId) {
        setError("User ID not found.");
        return;
      }
      const saveResponse = await axiosInstance.put(`/user/${userId}`, {
        name: tempUserData.name,
        email: tempUserData.email,
        phone: tempUserData.phone,
        address: tempUserData.location,
        profession: tempUserData.role,
        image: tempUserData.profileImage,
        // Do not include joinedAt to preserve original
      }, {withCredentials: true});
      if (saveResponse.status === 200) {
        const updatedUser = saveResponse.data.user;
        const formatDate = (dateString) => {
          if (!dateString) return '';
          return new Date(dateString).toISOString().split('T')[0];
        };
        setUserData({
          ...tempUserData,
          joinDate: formatDate(updatedUser.joinedAt), // Refetch the date from backend
        });
        setIsEditing(false);
        Swal.fire('Saved!', 'Your profile has been updated.', 'success');
      } else {
        console.log(saveResponse.response.data.message)
        Swal.fire('Error', 'Failed to save profile.', 'error');
      }
    } catch (error) {
      console.error("Error saving user data:", error.response.data.message);
      Swal.fire('Error', `${error.response.data.message}`, 'error');
    }
  };

  const handleCancel = () => {
    setTempUserData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempUserData({
      ...tempUserData,
      [field]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUserData({
          ...tempUserData,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Profile Header with Gradient */}
              <ProfileHeader
                userData={userData}
                handleImageChange={handleImageChange}
                handleInputChange={handleInputChange}
                tempUserData={tempUserData}
                isEditing={isEditing}
              />

              {/* Contact Information */}
              <ContactInformation
                userData={userData}
                handleInputChange={handleInputChange}
                tempUserData={tempUserData}
                isEditing={isEditing}
              />

              {/* Action Buttons */}
              <ActionButton
                isEditing={isEditing}
                handleEdit={handleEdit}
                handleLogout={confirmLogout}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            </div>
          </div>

          {/* Stats Section */}
          <Stats />
        </div>
      </main>
    </div>
  );
}