const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  pgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pg"
  },

  message: String,

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema)