import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import footprintRoutes from "./src/routes/footprint.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. http://localhost:5173
    credentials: true,
  })
);

// ✅ Test route
app.get("/", (req, res) => res.send("API is running..."));
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ✅ Routes
app.use("/api/footprints", footprintRoutes);
app.use("/api/auth", authRoutes); // <-- auth routes registered here

// ✅ Connect to DB and start server
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
   app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
   });
  })
  .catch((err) => {
    console.error("❌ Server not started due to DB error:", err.message);
  });

