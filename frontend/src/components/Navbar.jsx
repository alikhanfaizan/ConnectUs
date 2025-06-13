import React from "react";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";

// Navbar animation
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const buttonHover = {
  scale: 1.08,
};

function Navbar() {
  const { authUser, logout } = useAuthStore();

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[98%] sm:w-[96%] max-w-[1600px]
        backdrop-blur-xl bg-gradient-to-r from-base-100/80 via-base-200/70 to-base-100/80
        border border-base-300 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-500"
    >
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ rotate: 20, scale: 1.1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            className="size-10 bg-primary/10 rounded-xl flex items-center justify-center shadow-inner"
          >
            <MessageSquare className="w-5 h-5 text-primary" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1, letterSpacing: "0.05em" }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative text-xl font-semibold tracking-tight text-base-content transition-all duration-300
             after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all 
             after:duration-300 after:ease-in-out group-hover:after:w-full"
          >
            ConnectUs
          </motion.span>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={buttonHover}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="hover:shadow-md hover:shadow-primary/20 rounded-xl"
          >
            <Link
              to="/settings"
              className="btn btn-sm btn-ghost gap-2 text-sm hover:bg-base-200 rounded-xl"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </motion.div>

          {authUser && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={buttonHover}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                className="hover:shadow-md hover:shadow-primary/20 rounded-xl"
              >
                <Link
                  to="/profile"
                  className="btn btn-sm btn-ghost gap-2 text-sm hover:bg-base-200 rounded-xl"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={buttonHover}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                className="hover:shadow-md hover:shadow-error/30 rounded-xl"
              >
                <button
                  onClick={logout}
                  className="btn btn-sm btn-outline border-error text-error hover:bg-error hover:text-white gap-2 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
