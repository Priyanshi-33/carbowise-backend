import mongoose from "mongoose";

const footprintLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  activity: { type: String, required: true }, // e.g., "car", "flight"
  value: { type: Number, required: true }   // e.g., kg CO2
});
const FootprintLog = mongoose.model("FootprintLog", footprintLogSchema);
export default FootprintLog;



