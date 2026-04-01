const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookingSchema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    pgId:{
        type:Schema.Types.ObjectId,
        ref:"pgs",
        required:true
    },

    roomId:{
        type:Schema.Types.ObjectId,
        ref:"rooms",
        required:true
    },

    bookingDate:{
        type:Date,
        default:Date.now
    },

    status:{
        type:String,
        enum:["pending","confirmed","cancelled"],
        default:"pending"   // ✅ FIXED
    },

    paymentStatus:{
        type:String,
        enum:["pending","paid","failed"],  // ✅ upgraded
        default:"pending"
    },

    paymentId:{   // ✅ NEW (Razorpay)
        type:String,
        default:null
    },

    orderId:{   // ✅ NEW (Razorpay)
        type:String,
        default:null
    }

})

module.exports = mongoose.model("bookings", bookingSchema)