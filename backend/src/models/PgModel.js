const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pgSchema = new Schema({

    landlordId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    pgName:{
        type:String
    },

    description:{
        type:String
    },

    pgType:{
        type:String
    },

    address:{
        type:Object
    },

    amenities:{
        type:Array
    },

    photos:{
        type:Array
    },

    rules:{
        type:Array
    },

    priceRange:{
        type:Object
    },

    availabilityStatus:{
        type:String
    },

    verificationBadge:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model("pgs",pgSchema)