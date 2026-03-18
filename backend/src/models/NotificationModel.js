const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    title:{
        type:String
    },

    body:{
        type:String
    },

    type:{
        type:String
    },

    isRead:{
        type:Boolean,
        default:false
    }

},{timestamps:true})   // 👈 ADD THIS

module.exports = mongoose.model("notifications",notificationSchema)