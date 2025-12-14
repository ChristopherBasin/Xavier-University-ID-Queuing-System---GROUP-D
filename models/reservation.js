const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    hour: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "cancelled", "processing", "ready", "done"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
