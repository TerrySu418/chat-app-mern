import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectDB()
    .then(() => {
      console.log(`Server is running on port: ${PORT}`);
    })
    .catch((err) => {
      console.error("Failed to connect to the database:", err);
      process.exit(1);
    });
});
