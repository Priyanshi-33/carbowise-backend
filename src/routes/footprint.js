import express from "express";
import FootprintLog from "../models/FootprintLog.js"; // Correct import of Mongoose model

const router = express.Router();

// ✅ Add a new footprint
router.post("/", async (req, res) => {
  try {
    const newFootprint = new FootprintLog(req.body);
    await newFootprint.save();
    res.status(201).json(newFootprint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all footprints of a user
router.get("/:userId", async (req, res) => {
  try {
    const footprints = await FootprintLog.find({ userId: req.params.userId });
    res.status(200).json(footprints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;



