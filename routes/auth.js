const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { idNumber, surname, role } = req.body;

        const existing = await User.findOne({ idNumber });
        if (existing) {
            return res.json({ success: false, message: "User already exists" });
        }

        const rawPassword = surname.toLowerCase() + idNumber;
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const user = await User.create({
            idNumber,
            surname,
            password: hashedPassword,
            role
        });

        res.json({
            success: true,
            message: "User registered",
            generatedPassword: rawPassword
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;