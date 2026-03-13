const router = require("express").Router()

const {
    createReview,
    getAllReviews
} = require("../controllers/ReviewController")

// CREATE REVIEW
router.post("/",createReview)

// GET ALL REVIEWS
router.get("/",getAllReviews)

module.exports = router