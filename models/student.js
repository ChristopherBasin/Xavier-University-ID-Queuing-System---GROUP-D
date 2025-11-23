const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    course: { type: String, required: true },
    purpose: { type: String, required: true },
    queueNumber: { type: Number, required: true },
    status: { type: String, default: "waiting" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", StudentSchema);
