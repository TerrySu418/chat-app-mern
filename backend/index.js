import express from "express";
import "dotenv/config";
import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  connectDB()
    .then(() => {
      console.log(`Server is running on port: ${PORT}`);
    })
    .catch((err) => {
      console.error("Failed to connect to the database:", err);
      process.exit(1);
    });
});
