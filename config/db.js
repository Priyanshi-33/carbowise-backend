import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;   // ✅ Load from .env
    console.log("ENV VAR MONGODB_URI:", uri);

    if (!uri) {
      throw new Error("❌ MONGODB_URI is not defined in .env file");
    }

    console.log("Connecting to MongoDB:", uri);

    await mongoose.connect(uri);

    console.log("✅ MongoDB connected!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;

