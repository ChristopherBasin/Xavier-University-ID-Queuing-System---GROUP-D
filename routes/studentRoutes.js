const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.post("/", async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.json(newStudent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    const students = await Student.find().sort({ createdAt: 1 });
    res.json(students);
});

router.get("/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student);
});

router.put("/:id", async (req, res) => {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

router.delete("/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
