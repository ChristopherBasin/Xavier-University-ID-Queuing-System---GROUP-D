const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
    res.send("AUTH ROUTER IS ACTIVE");
});


// ==========================
// REGISTER USER
// ==========================
router.post("/register", async (req, res) => {
    try {
        const { idNumber, surname, role } = req.body;

        const existing = await User.findOne({ idNumber });
        if (existing) {
            return res.json({ success: false, message: "User already exists" });
        }

        // auto-generate password
        const rawPassword = surname.toLowerCase() + idNumber;
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        await User.create({
            idNumber,
            password: hashedPassword,
            role
        });

        res.json({
            success: true,
            message: "User registered successfully",
            generatedPassword: rawPassword
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


// ==========================
// LOGIN USER
// ==========================
router.post("/login", async (req, res) => {
    try {
        const { idNumber, password } = req.body;

        const user = await User.findOne({ idNumber });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid ID number or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid ID number or password"
            });
        }

        // create token
        const token = jwt.sign(
            {
                idNumber: user.idNumber,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            role: user.role
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


// ==========================
// REGISTER ADMIN (PROTECTED)
// ==========================
router.post("/register-admin", async (req, res) => {
    try {
        const { idNumber, password, adminSecret } = req.body;
        
        console.log("ENV ADMIN SECRET =", process.env.ADMIN_SECRET);
        console.log("REQUEST SECRET =", adminSecret);

        // simple protection
        if (adminSecret !== process.env.ADMIN_SECRET) {
            return res.status(403).json({
                success: false,
                message: "Invalid admin secret"
            });
        }

        const existing = await User.findOne({ idNumber });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            idNumber,
            password: hashedPassword,
            role: "admin"
        });

        res.json({
            success: true,
            message: "Admin account created"
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


module.exports = router;


