const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({

  pgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pg"
  },

  roomType: {
    type: String,
    enum: ["Single", "Double", "Triple"]
  },

  totalBeds: Number,

  availableBeds: Number,

  monthlyRent: Number,

  deposit: Number,

  roomAmenities: [String]

}, { timestamps: true })

module.exports = mongoose.model("Room", roomSchema)