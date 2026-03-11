const Room = require("../models/RoomModel")

exports.createRoom = async (req,res)=>{
  try{
    const room = await Room.create(req.body)
    res.json(room)
  }catch(err){
    res.status(500).json({error:err.message})
  }
}

exports.getAllRooms = async(req,res)=>{
  try{
    const rooms = await Room.find().populate("pgId")
    res.json(rooms)
  }catch(err){
    res.status(500).json({error:err.message})
  }
}

exports.getRoomById = async(req,res)=>{
  try{
    const room = await Room.findById(req.params.id)
    res.json(room)
  }catch(err){
    res.status(500).json({error:err.message})
  }
}

exports.updateRoom = async(req,res)=>{
  try{
    const room = await Room.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(room)
  }catch(err){
    res.status(500).json({error:err.message})
  }
}

exports.deleteRoom = async(req,res)=>{
  try{
    await Room.findByIdAndDelete(req.params.id)
    res.json({message:"Room deleted"})
  }catch(err){
    res.status(500).json({error:err.message})
  }
}