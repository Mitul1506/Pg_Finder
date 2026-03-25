const mongoose = require("mongoose")
const Schema = mongoose.Schema

const disputeSchema = new Schema({

    bookingId:{
        type:Schema.Types.ObjectId,
        ref:"bookings"
    },

    raisedBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    againstUserId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    issueType:{
        type:String
    },

    description:{
        type:String
    },

    status:{
        type:String,
        enum:["pending","in-progress","resolved","rejected"],
        default:"pending"
    },

    adminRemarks:{
        type:String
    }

},{timestamps:true})

module.exports = mongoose.model("dispute",disputeSchema)