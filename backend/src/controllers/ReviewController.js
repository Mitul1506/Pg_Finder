const Review = require("../models/ReviewModel")

exports.createReview = async(req,res)=>{
 try{
  const review = await Review.create(req.body)
  res.json(review)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.getAllReviews = async(req,res)=>{
 try{
  const reviews = await Review.find().populate("tenantId pgId")
  res.json(reviews)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.deleteReview = async(req,res)=>{
 try{
  await Review.findByIdAndDelete(req.params.id)
  res.json({message:"Review deleted"})
 }catch(err){
  res.status(500).json({error:err.message})
 }
}