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
// GET ROOMS BY PG
const getRoomsByPg = async(req,res)=>{
    try{

        const rooms = await roomSchema.find({pgId:req.params.pgId})

        res.status(200).json({
            message:"rooms fetched",
            data:rooms
        })

    }catch(error){

        res.status(500).json({
            message:"error fetching rooms",
            err:error
        })

    }
}
const getRoomById = async(req,res)=>{
    try{

        const room = await roomSchema.findById(req.params.id)

        res.status(200).json({
            message:"room fetched",
            data:room
        })

    }catch(error){

        res.status(500).json({
            message:"error fetching room",
            err:error
        })

    }
}

// UPDATE
const updateRoom = async(req,res)=>{
    try{

        const updatedRoom = await roomSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.status(200).json({
            message:"room updated",
            data:updatedRoom
        })

    }catch(error){

        res.status(500).json({
            message:"error updating room",
            err:error
        })

    }
}

// DELETE
const deleteRoom = async(req,res)=>{
    try{

        await roomSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"room deleted"
        })

    }catch(error){

        res.status(500).json({
            message:"error deleting room",
            err:error
        })

    }
}

module.exports = {
createRoom,
getAllRooms,
getRoomsByPg,
getRoomById,
updateRoom,
deleteRoom
}