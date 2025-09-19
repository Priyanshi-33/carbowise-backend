import express from "express";
import {
  register,
  login,
  logout,
  refreshAccessToken,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

// 🔹 Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refreshAccessToken);
router.get("/me", protect, getMe);

// 🔹 Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Reset link (frontend URL)
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Log email (for now)
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset.</p>
             <p>Click here: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });

    res.json({ msg: "Reset link generated. Check console log for URL." });
  } catch (err) {
    res.status(500).json({ msg: "Error sending reset email", error: err.message });
  }
});

// 🔹 Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    // Update password (hashed via pre-save hook in User.js)
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ msg: "Password reset successful. You can now log in." });
  } catch (err) {
    res.status(500).json({ msg: "Error resetting password", error: err.message });
  }
});

export default router;

