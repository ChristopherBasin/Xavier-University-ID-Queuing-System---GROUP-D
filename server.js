require("dotenv").config({ path: __dirname + "/.env" });
console.log("ADMIN_SECRET FROM ENV:", process.env.ADMIN_SECRET);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SystemSetting = require("./models/systemSetting"); // ✅ ONCE ONLY

const app = express();

// ==========================
// DATABASE CONNECTION
// ==========================
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// ROUTES
// ==========================
app.use("/api/students", require("./routes/student"));
app.use("/api/reservation", require("./routes/reservation"));
app.use("/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/adminProtected"));

// ==========================
// INIT SYSTEM SETTING
// ==========================
db.once("open", async () => {
  console.log("Connected to Database");

  const exists = await SystemSetting.findOne();
  if (!exists) {
    await SystemSetting.create({ reservationsOpen: false });
    console.log("System setting initialized");
  }
});

// ==========================
// SERVER START
// ==========================
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
