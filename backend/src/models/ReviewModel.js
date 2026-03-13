const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema({

    tenantId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    pgId:{
        type:Schema.Types.ObjectId,
        ref:"pgs"
    },

    rating:{
        type:Number
    },

    comment:{
        type:String
    },

    isApproved:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model("reviews",reviewSchema)