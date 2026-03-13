const router = require("express").Router()

const {
    createPayment,
    getAllPayments
} = require("../controllers/PaymentController")

// CREATE PAYMENT
router.post("/",createPayment)

// GET ALL PAYMENTS
router.get("/",getAllPayments)

module.exports = router