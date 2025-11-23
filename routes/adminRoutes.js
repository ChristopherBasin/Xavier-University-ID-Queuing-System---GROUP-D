const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const exists = await Admin.findOne({ username });
        if (exists) return res.status(400).json({ message: "Username already taken" });

        const admin = await Admin.create({ username, password });
        res.json({ message: "Admin created", admin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ message: "Admin not found" });

        const match = await admin.matchPassword(password);
        if (!match) return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ message: "Login success", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
