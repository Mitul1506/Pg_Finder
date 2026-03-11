const Dispute = require("../models/DisputeModel")

exports.createDispute = async(req,res)=>{
 try{
  const dispute = await Dispute.create(req.body)
  res.json(dispute)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.getAllDisputes = async(req,res)=>{
 try{
  const disputes = await Dispute.find()
  res.json(disputes)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.updateDispute = async(req,res)=>{
 try{
  const dispute = await Dispute.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.json(dispute)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}