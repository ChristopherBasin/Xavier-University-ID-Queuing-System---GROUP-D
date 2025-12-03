const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    idNumber: {
        type: String,
        required: true,
        match: /^[0-9]{11}$/ // Example: 20230027968
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    birthdate: {
        type: Date,
        required: true
    },
    preferredDate: {
        type: Date,
        required: true
    },
    emergencyContact: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        contactNumber: { type: String, required: true }
    },
    address: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", ReservationSchema);
