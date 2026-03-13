const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reportSchema = new Schema({

    reportType:{
        type:String
    },

    generatedBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },

    data:{
        type:Object
    }

})

module.exports = mongoose.model("reports",reportSchema)