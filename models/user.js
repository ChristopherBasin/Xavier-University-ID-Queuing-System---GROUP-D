const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);