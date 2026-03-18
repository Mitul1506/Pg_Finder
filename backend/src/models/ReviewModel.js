const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema({

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

    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    comment:{
        type:String,
        required:true
    },

    isApproved:{
        type:Boolean,
        default:true // auto approve (you can change later)
    }

},{timestamps:true})

module.exports = mongoose.model("reviews",reviewSchema)