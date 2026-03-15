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
const getReviewById = async(req,res)=>{
    try{

        const review = await reviewSchema.findById(req.params.id)

        res.status(200).json({
            message:"review fetched",
            data:review
        })

    }catch(error){

        res.status(500).json({
            message:"error fetching review",
            err:error
        })

    }
}

const updateReview = async(req,res)=>{
    try{

        const review = await reviewSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.status(200).json({
            message:"review updated",
            data:review
        })

    }catch(error){

        res.status(500).json({
            message:"error updating review",
            err:error
        })

    }
}

const deleteReview = async(req,res)=>{
    try{

        await reviewSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"review deleted"
        })

    }catch(error){

        res.status(500).json({
            message:"error deleting review",
            err:error
        })

    }
}

module.exports={
createReview,
getAllReviews,
getReviewById,
updateReview,
deleteReview
}