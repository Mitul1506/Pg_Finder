const Review = require("../models/ReviewModel")
const Booking = require("../models/BookingModel")
const mongoose = require("mongoose")

// ==============================
// CREATE REVIEW (Only if booked)
// ==============================
const createReview = async (req, res) => {
    try {

        const { userId, pgId, rating, comment } = req.body

        // 🔴 Validate input
        if (!userId || !pgId || !rating || !comment) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // 🔴 Check rating range
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 to 5"
            })
        }

        // ✅ Check if user booked this PG
        const booking = await Booking.findOne({
            userId,
            pgId,
            status: "confirmed"
        })

        if (!booking) {
            return res.status(400).json({
                message: "You can only review booked PG"
            })
        }

        // ❌ Prevent duplicate review
        const existingReview = await Review.findOne({ userId, pgId })

        if (existingReview) {
            return res.status(400).json({
                message: "You already reviewed this PG"
            })
        }

        // ✅ Create review
        const review = await Review.create({
            userId,
            pgId,
            rating,
            comment
        })

        res.status(201).json({
            message: "Review added successfully",
            data: review
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Error creating review"
        })
    }
}

// ==============================
// GET REVIEWS BY PG
// ==============================
const getReviewsByPg = async (req, res) => {
    try {

        const { pgId } = req.params

        const reviews = await Review.find({ pgId })
            .populate("userId", "firstName lastName")
            .sort({ createdAt: -1 })

        res.status(200).json({
            message: "Reviews fetched",
            data: reviews
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching reviews"
        })
    }
}

// ==============================
// GET AVERAGE RATING
// ==============================
const getAverageRating = async (req, res) => {
    try {

        const { pgId } = req.params

        const result = await Review.aggregate([
            {
                $match: {
                    pgId: new mongoose.Types.ObjectId(pgId)
                }
            },
            {
                $group: {
                    _id: "$pgId",
                    avgRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ])

        res.status(200).json({
            averageRating: result[0]?.avgRating || 0,
            totalReviews: result[0]?.totalReviews || 0
        })

    } catch (err) {

        res.status(500).json({
            message: "Error calculating rating"
        })
    }
}

// ==============================
// DELETE REVIEW
// ==============================
const deleteReview = async (req, res) => {
    try {

        const review = await Review.findById(req.params.id)

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            })
        }

        await Review.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Review deleted successfully"
        })

    } catch (err) {

        res.status(500).json({
            message: "Error deleting review"
        })
    }
}

// ==============================
// UPDATE REVIEW (OPTIONAL)
// ==============================
const updateReview = async (req, res) => {
    try {

        const { rating, comment } = req.body

        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({
                message: "Rating must be between 1 to 5"
            })
        }

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { rating, comment },
            { new: true }
        )

        if (!updatedReview) {
            return res.status(404).json({
                message: "Review not found"
            })
        }

        res.status(200).json({
            message: "Review updated",
            data: updatedReview
        })

    } catch (err) {

        res.status(500).json({
            message: "Error updating review"
        })
    }
}

// ==============================
// EXPORTS
// ==============================
module.exports = {
    createReview,
    getReviewsByPg,
    getAverageRating,
    deleteReview,
    updateReview
}