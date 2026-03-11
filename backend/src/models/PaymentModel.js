const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({

  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  },

  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  amount: Number,

  method: {
    type: String,
    enum: ["UPI", "Card", "NetBanking"]
  },

  transactionId: String,

  status: {
    type: String,
    enum: ["Success", "Failed"]
  }

}, { timestamps: true })

module.exports = mongoose.model("Payment", paymentSchema)