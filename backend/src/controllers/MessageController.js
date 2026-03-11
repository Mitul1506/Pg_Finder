const Message = require("../models/MessageModel")

exports.sendMessage = async(req,res)=>{
 try{
  const message = await Message.create(req.body)
  res.json(message)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.getMessages = async(req,res)=>{
 try{
  const messages = await Message.find()
  res.json(messages)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}