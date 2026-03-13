const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookingSchema = new Schema({

    tenantId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    pgId:{
        type:Schema.Types.ObjectId,
        ref:"pgs"
    },

    roomId:{
        type:Schema.Types.ObjectId,
        ref:"rooms"
    },

    checkInDate:{
        type:Date
    },

    months:{
        type:Number
    },

    bookingStatus:{
        type:String
    },

    totalAmount:{
        type:Number
    },

    paymentStatus:{
        type:String
    }

})

module.exports = mongoose.model("bookings",bookingSchema)