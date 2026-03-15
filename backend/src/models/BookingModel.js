const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookingSchema = new Schema({

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

tenantId:{
type:Schema.Types.ObjectId,
ref:"user",
required:true
},

bookingDate:{
type:Date,
default:Date.now
},

status:{
type:String,
default:"Confirmed"
}

})

module.exports = mongoose.model("bookings",bookingSchema)