// backend/seed/resetAdminPassword.js
// Resets the admin password. The new password is hashed by the
// userModel pre-save hook, same as any signup.
//
// Usage (from backend/):
//   NEW_ADMIN_PASSWORD=<new password> node seed/resetAdminPassword.js
// Optional: SEED_ADMIN_EMAIL to target a different account.

import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/userModel.js";

dotenv.config();

const email = (
  process.env.SEED_ADMIN_EMAIL || "admin@horlawealthgadget.com"
).toLowerCase();
const newPassword = process.env.NEW_ADMIN_PASSWORD;

if (!newPassword) {
  console.error("NEW_ADMIN_PASSWORD env var not set");
  process.exit(1);
}

await mongoose.connect(process.env.DATABASE_URL);
const user = await User.findOne({ email });
if (!user) {
  console.error(`No user found for ${email}`);
  await mongoose.disconnect();
  process.exit(1);
}
user.password = newPassword;
await user.save();
console.log(`Password reset for ${email}`);
await mongoose.disconnect();
process.exit(0);
