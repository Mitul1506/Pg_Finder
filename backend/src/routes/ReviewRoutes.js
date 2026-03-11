const router = require("express").Router()

const {
  createReview,
  getAllReviews,
  deleteReview
} = require("../controllers/ReviewController")

// CREATE
router.post("/", createReview)

// READ
router.get("/", getAllReviews)

// DELETE
router.delete("/:id", deleteReview)

module.exports = router