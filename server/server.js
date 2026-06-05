import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import cors from "cors";

import authRoutes from "./routes/auth.router.js";
import taskRoutes from "./routes/task.router.js"

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})