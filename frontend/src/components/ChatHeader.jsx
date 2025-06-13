import React from "react";
import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-3 border-b border-base-300 bg-base-100/90 backdrop-blur-md rounded-t-xl"
    >
      <div className="flex items-center justify-between">
        {/* Left: Avatar + Info */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className={`w-10 h-10 rounded-full object-cover border 
                ${isOnline ? "border-green-400 ring-2 ring-green-300" : "border-base-300"}`}
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-100 rounded-full"></span>
            )}
          </div>

          {/* User Info */}
          <div className="text-left">
            <h3 className="font-semibold text-base-content text-sm sm:text-[15px]">
              {selectedUser.fullName}
            </h3>
            <p className={`text-xs ${isOnline ? "text-green-500" : "text-zinc-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <motion.button
          onClick={() => setSelectedUser(null)}
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-zinc-500 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ChatHeader;
