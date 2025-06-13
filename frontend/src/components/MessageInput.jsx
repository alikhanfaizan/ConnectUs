import React, { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 w-full bg-base-100/90 backdrop-blur-md shadow-inner rounded-t-xl"
    >
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border border-zinc-300 shadow-md transition"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-zinc-800/70 text-white 
                         hover:bg-red-500 flex items-center justify-center transition-opacity opacity-0 
                         group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered input-sm sm:input-md w-full rounded-xl shadow-sm 
                       bg-base-200/80 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <motion.button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.1 }}
            className={`
              hidden sm:flex btn btn-circle btn-sm shadow-md transition
              ${imagePreview ? "text-emerald-500" : "text-zinc-400"}
            `}
          >
            <Image size={20} />
          </motion.button>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!text.trim() && !imagePreview}
          className="btn btn-primary btn-sm btn-circle shadow-md disabled:opacity-50"
        >
          <Send size={22} />
        </motion.button>
      </form>
    </motion.div>
  );
}

export default MessageInput;
