const router = require("express").Router()

const {
    createReview,
    getReviewsByPg,
    getAverageRating,
    deleteReview,
    updateReview
} = require("../controllers/ReviewController")


router.post("/", createReview)


router.get("/pg/:pgId", getReviewsByPg)


router.get("/avg/:pgId", getAverageRating)


router.put("/:id", updateReview)


router.delete("/:id", deleteReview)

module.exports = router