const mongoose = require("mongoose")

const pgSchema = new mongoose.Schema({

  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  pgName: String,

  description: String,

  pgType: {
    type: String,
    enum: ["Boys", "Girls", "Unisex"]
  },

  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },

  amenities: [String],

  photos: [String],

  rules: [String],

  priceRange: {
    min: Number,
    max: Number
  },

  availabilityStatus: {
    type: String,
    enum: ["Available", "Full"]
  },

  averageRating: {
    type: Number,
    default: 0
  },

  totalReviews: {
    type: Number,
    default: 0
  },

  verificationBadge: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

module.exports = mongoose.model("Pg", pgSchema)