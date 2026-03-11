const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  title: String,

  body: String,

  type: {
    type: String,
    enum: ["Booking", "Payment", "System"]
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

module.exports = mongoose.model("Notification", notificationSchema)