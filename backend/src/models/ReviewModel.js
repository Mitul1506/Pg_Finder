const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({

  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  pgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pg"
  },

  rating: {
    type: Number,
    min: 1,
    max: 5
  },

  comment: String,

  isApproved: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema)