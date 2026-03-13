const roomSchema = require("../models/RoomModel")

const createRoom = async(req,res)=>{
    try{

        const savedRoom = await roomSchema.create(req.body)

        res.status(201).json({
            message:"room created..",
            data:savedRoom
        })

    }catch(error){

        res.status(500).json({
            message:"error while creating room",
            err:error
        })

    }
}

const getAllRooms = async(req,res)=>{
    try{

        const rooms = await roomSchema.find()

        res.status(200).json({
            message:"rooms fetched..",
            data:rooms
        })

    }catch(error){

        res.status(500).json({
            message:"error while fetching rooms",
            err:error
        })

    }
}

module.exports = {
    createRoom,
    getAllRooms
}