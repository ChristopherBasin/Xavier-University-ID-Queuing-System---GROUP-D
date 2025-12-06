const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const auth = require("../middleware/auth");

// CREATE RESERVATION
router.post("/reservation", async (req, res) => {
    try {
        const {
            idNumber,
            name,
            age,
            birthdate,
            preferredDate,
            emergencyContact,
            address,
            mobileNumber
        } = req.body;

        const reservation = await Reservation.create({
            idNumber,
            name,
            age,
            birthdate,
            preferredDate,
            emergencyContact,
            address,
            mobileNumber
        });

        res.json({
            success: true,
            message: "Reservation submitted successfully",
            reservation
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET ALL RESERVATIONS
router.get("/", async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ preferredDate: 1 });
        res.json({ success: true, reservations });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET RECEIPT BY ID NUMBER
router.get("/receipt/:idNumber", async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ idNumber: req.params.idNumber });

        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }

        res.json({
            success: true,
            receipt: {
                title: "Xavier University ID Reservation Receipt",
                referenceNumber: reservation._id,
                idNumber: reservation.idNumber,
                name: reservation.name,
                preferredDate: reservation.preferredDate,
                createdAt: reservation.createdAt,
                message: "Show this receipt to the admin during your scheduled ID processing."
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// UPDATE RESERVATION BY _ID
router.put("/:id", async (req, res) => {
    try {
        const updated = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }

        res.json({ success: true, message: "Reservation updated successfully", updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE RESERVATION BY _ID
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Reservation.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }

        res.json({ success: true, message: "Reservation deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});



module.exports = router;