const mongoose = require("mongoose")

const disputeSchema = new mongoose.Schema({

  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  },

  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  againstUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  issueType: String,

  description: String,

  status: {
    type: String,
    enum: ["Open", "Resolved"],
    default: "Open"
  },

  adminRemarks: String

}, { timestamps: true })

module.exports = mongoose.model("Dispute", disputeSchema)