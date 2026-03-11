const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  pgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pg"
  },

  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  },

  checkInDate: Date,

  months: Number,

  bookingStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending"
  },

  totalAmount: Number,

  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending"
  }

}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema)