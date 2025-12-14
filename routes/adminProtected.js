const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Reservation = require("../models/reservation");
const SystemSetting = require("../models/systemSetting");

// ==========================
// ADMIN DASHBOARD
// ==========================
router.get("/dashboard", auth("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
    admin: req.user
  });
});

// ==========================
// VIEW ALL RESERVATIONS
// ==========================
router.get("/reservations", auth("admin"), async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reservations.length,
      reservations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// 🔍 SEARCH RESERVATIONS (IMPORTANT: ABOVE :id ROUTES)
// ==========================
router.get("/reservations/search", auth("admin"), async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "studentId query is required"
      });
    }

    const reservations = await Reservation.find({ studentId });

    res.json({
      success: true,
      count: reservations.length,
      reservations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// UPDATE RESERVATION STATUS
// ==========================
router.patch("/reservations/:id/status", auth("admin"), async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "cancelled",
      "processing",
      "ready",
      "done"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found"
      });
    }

    res.json({
      success: true,
      reservation
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// OPEN RESERVATIONS
// ==========================
router.patch("/system/open", auth("admin"), async (req, res) => {
  await SystemSetting.updateOne({}, { reservationsOpen: true });

  res.json({
    success: true,
    message: "Reservations are now OPEN"
  });
});

// ==========================
// CLOSE RESERVATIONS
// ==========================
router.patch("/system/close", auth("admin"), async (req, res) => {
  await SystemSetting.updateOne({}, { reservationsOpen: false });

  res.json({
    success: true,
    message: "Reservations are now CLOSED"
  });
});

// ==========================
// RESET SYSTEM (ADMIN ONLY)
// ==========================
router.patch("/system/reset", auth("admin"), async (req, res) => {
  try {
    await Reservation.deleteMany({});
    await SystemSetting.updateOne({}, { reservationsOpen: false });

    res.json({
      success: true,
      message: "System reset complete. Reservations are now CLOSED."
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
