const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// CREATE
router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.json({ success: true, message: "Student created", student });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// READ ALL
router.get("/", async (req, res) => {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({ success: true, students });
});

// READ ONE
router.get("/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json({ success: true, student });
});

// UPDATE
router.put("/:id", async (req, res) => {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Student updated", updated });
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Student deleted" });
});

module.exports = router;
