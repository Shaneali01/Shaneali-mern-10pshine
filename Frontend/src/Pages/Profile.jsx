import React, { useState } from "react";
import Header from "../Components/Profile/Header";
import ContactInformation from "../Components/Profile/ContactInformation";
import ActionButton from "../Components/Profile/ActionButton";
import BioSection from "../Components/Profile/BioSection";
import Stats from "../Components/Profile/Stats";
import ProfileHeader from "../Components/Profile/ProfileHeader";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    role: "Software Developer Intern",
    joinDate: "September 2024",
    bio: "Passionate about creating intuitive applications and learning new technologies. Currently working on a notes management system during my internship.",
    profileImage: null,
  });

  const [tempUserData, setTempUserData] = useState({ ...userData });

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      alert("Logging out... (You will implement actual logout logic here)");
    }
  };

  const handleEdit = () => {
    setTempUserData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({ ...tempUserData });
    setIsEditing(false);
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

              {/* Bio Section */}
              <BioSection
                isEditing={isEditing}
                handleInputChange={handleInputChange}
                tempUserData={tempUserData}
                userData={userData}
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
                handleLogout={handleLogout}
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
