// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import footprintRoutes from "./src/routes/footprint.js";
import authRoutes from "./src/routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// ✅ Load .env explicitly from backend root
dotenv.config({ path: "./.env" });

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g., http://localhost:5173
    credentials: true,
  })
);

// ✅ Test routes
app.get("/", (req, res) => res.send("API is running..."));
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ✅ Routes
app.use("/api/footprints", footprintRoutes);
app.use("/api/auth", authRoutes);

// ✅ MongoDB connection function
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env");
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    throw err;
  }
};

// ✅ Start server after DB connection
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Server not started due to DB error:", err.message);
  });


