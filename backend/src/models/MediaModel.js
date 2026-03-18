const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mediaSchema = new Schema({

    fileName:{
        type:String
    },

    url:{
        type:String
    },

    publicId:{
        type:String
    },

    uploadedBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("media",mediaSchema)