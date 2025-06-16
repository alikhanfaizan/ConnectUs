// lib/socket.js
import { Server } from 'socket.io';

let io;
const userSocketMap = {};

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io };
