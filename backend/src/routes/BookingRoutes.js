const router = require("express").Router()

const {
createBooking,
getAllBookings,
getBookingsByUser,
cancelBooking
} = require("../controllers/BookingController")

router.post("/", createBooking)

router.get("/", getAllBookings)

router.get("/user/:userId", getBookingsByUser)

router.delete("/:id", cancelBooking)

module.exports = router