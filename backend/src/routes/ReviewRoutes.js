const router = require("express").Router()

const {
createReview,
getAllReviews,
getReviewById,
updateReview,
deleteReview
} = require("../controllers/ReviewController")

// CREATE
router.post("/",createReview)

// READ
router.get("/",getAllReviews)
router.get("/:id",getReviewById)

// UPDATE
router.put("/:id",updateReview)

// DELETE
router.delete("/:id",deleteReview)

module.exports = router