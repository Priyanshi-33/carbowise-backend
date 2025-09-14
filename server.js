import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import footprintRoutes from "./src/routes/footprint.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => res.send("API is running..."));
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ✅ Routes
app.use("/api/footprints", footprintRoutes);

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

  
