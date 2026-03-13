const mongoose = require("mongoose")
const Schema = mongoose.Schema

const paymentSchema = new Schema({

    bookingId:{
        type:Schema.Types.ObjectId,
        ref:"bookings"
    },

    tenantId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    landlordId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    amount:{
        type:Number
    },

    method:{
        type:String
    },

    transactionId:{
        type:String
    },

    status:{
        type:String
    }

})

module.exports = mongoose.model("payments",paymentSchema)