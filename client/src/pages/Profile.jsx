import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEdit2 } from "react-icons/fi";

// Import components
import DashboardLayout from "../components/layouts/DashboardLayout";
import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInformation from "../components/profile/PersonalInformation";
import ResumeActivity from "../components/profile/ResumeActivity";
import SkillsSection from "../components/profile/SkillsSection";
import AccountPlan from "../components/profile/AccountPlan";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // User data would come from context/API in a real app
  const [userData, setUserData] = useState({
    name: "Jessica Chen",
    email: "jessica.chen@example.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Product Designer",
    company: "TechVision Inc.",
    location: "San Francisco, CA",
    about:
      "Product designer with 6+ years of experience creating user-centered digital experiences for SaaS products. Passionate about solving complex problems through intuitive design.",
    skills: [
      "UI/UX Design",
      "Product Strategy",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
    ],
    resumeActivity: [
      {
        id: 1,
        name: "Software Engineer",
        date: "Mar 15, 2025",
        status: "Updated",
      },
      {
        id: 2,
        name: "Product Designer",
        date: "Feb 28, 2025",
        status: "Created",
      },
    ],
    plan: "Pro",
    memberSince: "Jan 2025",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&crop=face&q=80",
  });

  // Handler for saving profile updates
  const handleSaveProfile = (updatedData) => {
    setUserData({ ...userData, ...updatedData });
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center w-full mt-12 md:mt-0">
        <div className="w-full max-w-6xl px-3 sm:px-6 py-6 md:py-10">
          {/* Page Header with Edit Toggle */}
          <div className="flex justify-between items-center mb-8">
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My Profile
            </motion.h1>

            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiEdit2 size={16} />
              {isEditing ? "Cancel" : "Edit Profile"}
            </motion.button>
          </div>

          {/* Profile Content Sections */}
          <div className="space-y-6 pb-12">
            {/* Profile Header with Photo */}
            <ProfileHeader
              userData={userData}
              isEditing={isEditing}
              onSave={handleSaveProfile}
            />

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <PersonalInformation
                  userData={userData}
                  isEditing={isEditing}
                  onSave={handleSaveProfile}
                />

                <ResumeActivity activities={userData.resumeActivity} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <SkillsSection
                  skills={userData.skills}
                  isEditing={isEditing}
                  onSave={(skills) => handleSaveProfile({ skills })}
                />

                <AccountPlan
                  plan={userData.plan}
                  memberSince={userData.memberSince}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
