const mongoose = require("mongoose")
const Schema = mongoose.Schema

const disputeSchema = new Schema({

    bookingId:{
        type:Schema.Types.ObjectId,
        ref:"bookings"
    },

    raisedBy:{
        type:Schema.Types.ObjectId,
        ref:"users"
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
        type:String
    },

    adminRemarks:{
        type:String
    }

})

module.exports = mongoose.model("disputes",disputeSchema)