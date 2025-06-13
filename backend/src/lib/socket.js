import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
const app= express();
const server = http.createServer(app);

const io=new Server(server, {
    cors:{
        origin: ["http://localhost:5173"],

    }
});

export function getReceiverSocketId(userId) {
    // This function retrieves the socket ID for a given user ID
    return userSocketMap[userId]; // Return the socket ID or null if not found
}

//used to store user socket ids
const userSocketMap={}
io.on("connection",(socket)=>{
    console.log("New client connected: " + socket.id);
    const userId = socket.handshake.query.userId; // Assuming userId is sent as a query parameter
    if (userId) {
        userSocketMap[userId] = socket.id; // Store the socket ID with the user ID
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap)); // Emit the list of online users

    socket.on("disconnect", () => {
        console.log("Client disconnected: " + socket.id);
        delete userSocketMap[userId]; // Remove the user from the map on disconnect
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit the updated list of online users
    });

    // Add more event listeners as needed
})
export {io,server,app};