const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// CREATE student
router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.json({ success: true, message: "Student created", student });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// READ ALL students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.json({ success: true, students });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ⭐ READ ONE by studentId (used for login, confirmation)
router.get("/by-student-id/:studentId", async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.studentId });
        if (!student)
            return res.json({ success: false, message: "Student not found" });

        res.json({ success: true, student });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// READ ONE by MongoDB _id
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.json({ success: true, student });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// UPDATE student
router.put("/:id", async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ success: true, message: "Student updated", updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE student
router.delete("/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Student deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
