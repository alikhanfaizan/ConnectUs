// index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { initSocket } from "./lib/socket.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

initSocket(server); // ✅ Initialize sockets here

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
