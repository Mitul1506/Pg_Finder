const Payment = require("../models/PaymentModel")

exports.createPayment = async(req,res)=>{
 try{
  const payment = await Payment.create(req.body)
  res.json(payment)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.getAllPayments = async(req,res)=>{
 try{
  const payments = await Payment.find()
  res.json(payments)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.getPaymentById = async(req,res)=>{
 try{
  const payment = await Payment.findById(req.params.id)
  res.json(payment)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.updatePayment = async(req,res)=>{
 try{
  const payment = await Payment.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.json(payment)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.deletePayment = async(req,res)=>{
 try{
  await Payment.findByIdAndDelete(req.params.id)
  res.json({message:"Payment deleted"})
 }catch(err){
  res.status(500).json({error:err.message})
 }
}