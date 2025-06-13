import { Camera, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Card */}
        <div className="bg-base-300 p-6 rounded-2xl shadow-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-sm text-base-content/60 mt-1">
              View and manage your profile details
            </p>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-base-200 transition-all duration-200 group-hover:scale-105"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content p-2 rounded-full shadow-md cursor-pointer transition hover:scale-105
                ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-70" : ""}`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs text-base-content/70">
              {isUpdatingProfile ? "Uploading..." : "Click camera icon to change photo"}
            </p>
          </div>

          {/* Basic Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm text-base-content/60 flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300">
                {authUser?.fullName || "N/A"}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-base-content/60 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300">
                {authUser?.email || "N/A"}
              </p>
            </div>
          </div>

          {/* Extra Account Info */}
          <div className="pt-6 border-t border-base-300 space-y-4">
            <h2 className="text-lg font-semibold">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-base-200">
                {/* <span className="text-base-content/70">Member Since</span>
                <span className="font-medium">
                  {authUser?.createdAt?.split("T")[0] || "Unknown"}
                </span> */}
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-base-content/70">Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
