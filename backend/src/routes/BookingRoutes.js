const router = require("express").Router()

const validateToken = require("../middleware/AuthMiddleware") 

const {
    createBooking,
    getUserBookings,
    cancelBooking,
    getBookingsByLandlord,
    updateBookingStatus,
    deleteBooking,
    getAllBookings
} = require("../controllers/BookingController")


router.post("/", validateToken, createBooking) 

router.get("/user/:userId", validateToken, getUserBookings)


router.put("/cancel/:id", validateToken, cancelBooking)


router.get("/landlord/:landlordId", validateToken, getBookingsByLandlord)


router.put("/status/:id", validateToken, updateBookingStatus)


router.delete("/:id", validateToken, deleteBooking)


router.get("/", validateToken, getAllBookings)

module.exports = router