const reviewSchema = require("../models/ReviewModel")

const createReview = async(req,res)=>{
    try{

        const savedReview = await reviewSchema.create(req.body)

        res.status(201).json({
            message:"review created..",
            data:savedReview
        })

    }catch(error){

        res.status(500).json({
            message:"error while creating review",
            err:error
        })

    }
}

const getAllReviews = async(req,res)=>{
    try{

        const reviews = await reviewSchema.find()

        res.status(200).json({
            message:"reviews fetched..",
            data:reviews
        })

    }catch(error){

        res.status(500).json({
            message:"error while fetching reviews",
            err:error
        })

    }
}

module.exports = {
    createReview,
    getAllReviews
}