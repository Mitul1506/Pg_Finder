const router = require("express").Router()

const validateToken = require("../middleware/AuthMiddleware") // ✅ ADD THIS

const {
    createBooking,
    getUserBookings,
    cancelBooking,
    getBookingsByLandlord,
    updateBookingStatus,
    deleteBooking,
    getAllBookings
} = require("../controllers/BookingController")

// ================= CREATE BOOKING =================
router.post("/", validateToken, createBooking) // 🔐 protected

// ================= GET USER BOOKINGS =================
router.get("/user/:userId", validateToken, getUserBookings)

// ================= CANCEL BOOKING =================
router.put("/cancel/:id", validateToken, cancelBooking)

// ================= LANDLORD BOOKINGS =================
router.get("/landlord/:landlordId", validateToken, getBookingsByLandlord)

// ================= UPDATE STATUS =================
router.put("/status/:id", validateToken, updateBookingStatus)

// ================= DELETE BOOKING =================
router.delete("/:id", validateToken, deleteBooking)

// ================= ADMIN GET ALL BOOKINGS =================
router.get("/", validateToken, getAllBookings)

module.exports = router