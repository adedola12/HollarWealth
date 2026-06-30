// backend/seed/seedAdmin.js
// Seeds an initial Admin user, a Store, and default UAC roles.
// Safe & idempotent: re-running will not duplicate or wipe data.
//
// Usage (from backend/):
//   npm run seed
// Optional overrides via env (or backend/.env):
//   SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_FIRST,
//   SEED_ADMIN_LAST, SEED_ADMIN_PHONE, SEED_STORE_NAME

import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import Store from "../models/storeModel.js";
import Role from "../models/roleModel.js";
import PERM from "../models/permissionEnum.js";

dotenv.config();

const ADMIN = {
  firstName: process.env.SEED_ADMIN_FIRST || "Horlawealth",
  lastName: process.env.SEED_ADMIN_LAST || "Admin",
  email: (process.env.SEED_ADMIN_EMAIL || "admin@horlawealthgadget.com").toLowerCase(),
  password: process.env.SEED_ADMIN_PASSWORD || "Admin@12345",
  whatAppNumber: process.env.SEED_ADMIN_PHONE || "08000000000",
};
const STORE_NAME = process.env.SEED_STORE_NAME || "Horlawealth Gadget";

const ALL_PERMS = Object.values(PERM);

// Default role -> permission sets (granular UAC for staff accounts)
const DEFAULT_ROLES = {
  Admin: ALL_PERMS,
  Manager: [
    PERM.ORDER_READ,
    PERM.ORDER_MANAGE,
    PERM.PRODUCT_READ,
    PERM.PRODUCT_MANAGE,
    PERM.LOGISTICS_READ,
    PERM.LOGISTICS_MANAGE,
    PERM.USER_MANAGE,
  ],
  Inventory: [PERM.PRODUCT_READ, PERM.PRODUCT_MANAGE, PERM.ORDER_READ],
  SalesRep: [PERM.ORDER_READ, PERM.ORDER_MANAGE, PERM.PRODUCT_READ],
  Logistics: [PERM.LOGISTICS_READ, PERM.LOGISTICS_MANAGE, PERM.ORDER_READ],
};

async function run() {
  await connectDB();

  // 1) Admin user (create-or-promote, password hashed by pre-save hook)
  let admin = await User.findOne({ email: ADMIN.email });
  let createdAdmin = false;
  if (admin) {
    if (admin.userType !== "Admin") {
      admin.userType = "Admin";
      await admin.save();
      console.log(`↺ Promoted existing user to Admin: ${ADMIN.email}`);
    } else {
      console.log(`✓ Admin already exists: ${ADMIN.email}`);
    }
  } else {
    admin = new User({ ...ADMIN, userType: "Admin" });
    await admin.save();
    createdAdmin = true;
    console.log(`✓ Created Admin user: ${ADMIN.email}`);
  }

  // 2) Store (owned by admin)
  let store = await Store.findOne({ name: STORE_NAME });
  if (!store) {
    store = await Store.create({
      name: STORE_NAME,
      industry: "Electronics / Gadgets",
      owner: admin._id,
    });
    console.log(`✓ Created store: ${STORE_NAME}`);
  } else {
    console.log(`✓ Store already exists: ${STORE_NAME}`);
  }

  // 3) Default roles for this store (upsert by name+store)
  for (const [name, permissions] of Object.entries(DEFAULT_ROLES)) {
    const res = await Role.updateOne(
      { name, store: store._id },
      { $set: { permissions }, $setOnInsert: { name, store: store._id } },
      { upsert: true }
    );
    const action = res.upsertedCount ? "created" : "updated";
    console.log(`  • role ${name} (${permissions.length} perms) ${action}`);
  }

  console.log("\n──────── Seed complete ────────");
  if (createdAdmin) {
    console.log("Login with:");
    console.log(`  email:    ${ADMIN.email}`);
    console.log(`  password: ${ADMIN.password}`);
    console.log("⚠  Change this password after first login.");
  } else {
    console.log("Admin already existed — credentials unchanged.");
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(async (err) => {
  console.error("Seed failed:", err.message);
  try {
    await mongoose.disconnect();
  } catch {
    /* ignore */
  }
  process.exit(1);
});
