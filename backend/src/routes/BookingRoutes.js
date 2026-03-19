const router = require("express").Router()

const {
    createBooking,
    getUserBookings,
    cancelBooking,
    getBookingsByLandlord,
    updateBookingStatus,
    deleteBooking,
    getAllBookings
} = require("../controllers/BookingController")

// CREATE BOOKING
router.post("/", createBooking)

// GET USER BOOKINGS
router.get("/user/:userId", getUserBookings)

// CANCEL BOOKING
router.put("/cancel/:id", cancelBooking)
router.get("/landlord/:landlordId", getBookingsByLandlord)
router.put("/status/:id", updateBookingStatus)
router.delete("/:id", deleteBooking)
router.get("/", getAllBookings)

module.exports = router