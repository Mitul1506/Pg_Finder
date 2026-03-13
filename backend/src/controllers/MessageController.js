const messageSchema = require("../models/MessageModel")

const createMessage = async(req,res)=>{
    try{

        const savedMessage = await messageSchema.create(req.body)

        res.status(201).json({
            message:"message created..",
            data:savedMessage
        })

    }catch(error){

        res.status(500).json({
            message:"error while creating message",
            err:error
        })

    }
}

const getAllMessages = async(req,res)=>{
    try{

        const messages = await messageSchema.find()

        res.status(200).json({
            message:"messages fetched..",
            data:messages
        })

    }catch(error){

        res.status(500).json({
            message:"error while fetching messages",
            err:error
        })

    }
}

module.exports = {
    createMessage,
    getAllMessages
}