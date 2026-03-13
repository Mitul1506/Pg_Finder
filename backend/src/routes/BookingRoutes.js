const router = require("express").Router()

const {
    createBooking,
    getAllBookings
} = require("../controllers/BookingController")

// CREATE BOOKING
router.post("/",createBooking)

// GET ALL BOOKINGS
router.get("/",getAllBookings)

module.exports = router