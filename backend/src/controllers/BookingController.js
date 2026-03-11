const Booking = require("../models/BookingModel")

exports.createBooking = async(req,res)=>{
 try{
  const booking = await Booking.create(req.body)
  res.json(booking)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.getAllBookings = async(req,res)=>{
 try{
  const bookings = await Booking.find().populate("tenantId pgId roomId")
  res.json(bookings)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.getBookingById = async(req,res)=>{
 try{
  const booking = await Booking.findById(req.params.id)
  res.json(booking)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.updateBooking = async(req,res)=>{
 try{
  const booking = await Booking.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.json(booking)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.deleteBooking = async(req,res)=>{
 try{
  await Booking.findByIdAndDelete(req.params.id)
  res.json({message:"Booking deleted"})
 }catch(err){
  res.status(500).json({error:err.message})
 }
}