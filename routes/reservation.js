const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const auth = require("../middleware/auth");
const SystemSetting = require("../models/systemSetting");

// STUDENT CREATE RESERVATION
router.post("/", auth("student"), async (req, res) => {
  try {
    const { date, hour } = req.body;
    const studentId = req.user.idNumber;

    // 1️⃣ CHECK IF SYSTEM IS OPEN
    const system = await SystemSetting.findOne();

    if (!system || !system.reservationsOpen) {
      return res.status(403).json({
        success: false,
        message: "Reservations are currently closed"
      });
    }

    // 2️⃣ BOOKING WINDOW CHECK
    const bookingStart = new Date(process.env.BOOKING_START);
    const bookingEnd = new Date(process.env.BOOKING_END);
    const selectedDate = new Date(date);

    if (selectedDate < bookingStart || selectedDate > bookingEnd) {
      return res.status(400).json({
        success: false,
        message: "Date not within booking period"
      });
    }

    // 3️⃣ EXISTING RESERVATION CHECK
    const existing = await Reservation.findOne({
      studentId,
      status: { $in: ["pending", "processing", "ready", "done"] }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You already have a reservation"
      });
    }

    // 4️⃣ HOURLY LIMIT CHECK
    const count = await Reservation.countDocuments({
      date,
      hour,
      status: { $ne: "cancelled" }
    });

    if (count >= 15) {
      return res.status(400).json({
        success: false,
        message: "Slot is full"
      });
    }

    // 5️⃣ CREATE RESERVATION
    const reservation = await Reservation.create({
      studentId,
      date,
      hour
    });

    res.json({
      success: true,
      reservation
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
