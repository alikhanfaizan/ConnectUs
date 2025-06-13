import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { motion } from "framer-motion";

function ChatContainer() {
  const {
    messages,
    isMessagesLoading,
    selectedUser,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser?._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;
          return (
            <motion.div
              key={message._id}
              ref={messageEndRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`chat ${isSender ? "chat-end" : "chat-start"} group`}
            >
              {/* Avatar */}
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      isSender
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile"
                  />
                </div>
              </div>

              {/* Header */}
              <div className="chat-header mb-1">
                <time className="text-xs text-zinc-400 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Message Content */}
              <div
                className={`chat-bubble transition-all duration-200 shadow-sm group-hover:shadow-md 
                flex flex-col px-3 py-2 rounded-xl text-sm
                ${
                  isSender
                    ? "bg-primary text-white"
                    : "bg-base-200 text-base-content"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="rounded-md mb-2 max-w-[200px] cursor-pointer hover:opacity-90 transition duration-200"
                    onClick={() => window.open(message.image, "_blank")}
                  />
                )}
                {message.text && <p className="whitespace-pre-line">{message.text}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
