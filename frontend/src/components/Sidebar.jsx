import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function Sidebar() {
  const { users, getUsers, selectedUser, isUsersLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full w-20 lg:w-72 flex flex-col transition-all duration-200 
        bg-base-100 shadow-xl border-r border-base-300 rounded-r-2xl"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5 bg-base-100/70 backdrop-blur-md rounded-tr-2xl">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-primary" />
          <span className="font-semibold hidden lg:block text-base-content">
            Contacts
          </span>
        </div>

        {/* Toggle */}
        <div className="mt-4 hidden lg:flex items-center gap-2 text-sm">
          <label className="cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md bg-base-200 hover:bg-base-300 transition">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span>Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({Math.max(0, onlineUsers.length - 1)} online)
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        {filteredUsers.map((user, index) => (
          <motion.button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className={`
              group w-full px-3 py-2 flex items-center gap-3 rounded-xl mx-2 mb-2
              relative overflow-hidden transition-all duration-300
              ${
                selectedUser?._id === user._id
                  ? "bg-primary/10 ring-2 ring-primary text-base-content"
                  : "hover:bg-base-200 hover:shadow-md"
              }
            `}
          >
            {/* Hover Left Border */}
            <span
              className={`
                absolute left-0 top-0 h-full w-1 rounded-r-full bg-primary 
                transition-all duration-300
                ${selectedUser?._id === user._id ? "opacity-100" : "group-hover:opacity-100 opacity-0"}
              `}
            />

            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className={`
                  size-12 object-cover rounded-full border border-base-300 transition-all duration-300 
                  group-hover:shadow-lg
                  ${
                    onlineUsers.includes(user._id)
                      ? "ring-2 ring-green-400"
                      : ""
                  }
                `}
                loading="lazy"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-base-content/90 text-[15px] group-hover:text-primary transition-colors">
                {user.fullName}
              </div>
              <div
                className={`text-xs transition-colors ${
                  onlineUsers.includes(user._id)
                    ? "text-green-500"
                    : "text-zinc-400 group-hover:text-zinc-600"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </motion.button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-6 text-sm italic">
            No online users
          </div>
        )}
      </div>
    </motion.aside>
  );
}

export default Sidebar;
