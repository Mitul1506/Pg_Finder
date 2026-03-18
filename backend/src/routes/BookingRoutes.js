const router = require("express").Router()

const {
    createBooking,
    getUserBookings,
    cancelBooking,
    getBookingsByLandlord
} = require("../controllers/BookingController")

// CREATE BOOKING
router.post("/", createBooking)

// GET USER BOOKINGS
router.get("/user/:userId", getUserBookings)

// CANCEL BOOKING
router.put("/cancel/:id", cancelBooking)
router.get("/landlord/:landlordId", getBookingsByLandlord)
module.exports = router