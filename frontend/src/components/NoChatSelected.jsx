import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-b from-base-100/60 to-base-200"
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="max-w-md text-center space-y-6"
      >
        {/* Glowing + Bouncing Icon */}
        <motion.div
          className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center shadow-md transition-all"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 15px rgba(109, 40, 217, 0.4)",
          }}
        >
          <MessageSquare className="w-8 h-8 text-primary" />
        </motion.div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-base-content">
          Welcome to <span className="text-primary">ConnectUs</span>!
        </h2>

        {/* Description */}
        <p className="text-base text-base-content/70">
          Select a conversation from the sidebar to start chatting.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default NoChatSelected;
