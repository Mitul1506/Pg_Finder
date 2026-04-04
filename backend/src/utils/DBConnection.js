const mongoose = require("mongoose")
require("dotenv").config()

const DBConnection = ()=>{
   mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected")
    console.log("Connected DB:", mongoose.connection.name)
    }).catch((e)=>{
        console.log(e)
    })
}
module.exports = DBConnection
    