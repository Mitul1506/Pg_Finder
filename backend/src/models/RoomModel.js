const mongoose = require("mongoose")
const Schema = mongoose.Schema

const roomSchema = new Schema({

    pgId:{
        type:Schema.Types.ObjectId,
        ref:"pgs"
    },

    roomType:{
        type:String
    },

    totalBeds:{
        type:Number
    },

    availableBeds:{
        type:Number
    },

    monthlyRent:{
        type:Number
    },

    deposit:{
        type:Number
    },

    roomAmenities:{
        type:Array
    }

})

module.exports = mongoose.model("rooms",roomSchema)