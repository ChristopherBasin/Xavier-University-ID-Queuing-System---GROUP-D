const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    birthday: { type: String, required: true },
    address: { type: String, required: true },
    emergencyPerson: { type: String, required: true },
    emergencyPhone: { type: String, required: true },
    queueNumber: { type: Number, default: null },
    purpose: { type: String, default: "ID Reservation" },
    course: { type: String, default: "N/A" }
}, { timestamps: true });

module.exports = mongoose.model("Student", StudentSchema);
