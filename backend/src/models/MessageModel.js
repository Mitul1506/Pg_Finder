const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema({

    senderId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    pgId:{
        type:Schema.Types.ObjectId,
        ref:"pgs"
    },

    message:{
        type:String
    },

    isRead:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model("messages",messageSchema)