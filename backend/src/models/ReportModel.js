const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({

  reportType: String,

  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  data: Object

}, { timestamps: true })

module.exports = mongoose.model("Report", reportSchema)