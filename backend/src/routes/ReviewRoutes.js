const router = require("express").Router()

const {
    createReview,
    getReviewsByPg,
    getAverageRating,
    deleteReview,
    updateReview
} = require("../controllers/ReviewController")

// CREATE
router.post("/", createReview)

// GET REVIEWS BY PG
router.get("/pg/:pgId", getReviewsByPg)

// GET AVERAGE RATING
router.get("/avg/:pgId", getAverageRating)

// UPDATE
router.put("/:id", updateReview)

// DELETE
router.delete("/:id", deleteReview)

module.exports = router