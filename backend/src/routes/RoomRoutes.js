const router = require("express").Router()

const validateToken = require("../middleware/AuthMiddleware") // ✅ add middleware

const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomsByPg,
  getRoomsByLandlord
} = require("../controllers/RoomController")

// ================= CREATE ROOM =================
router.post("/", validateToken, createRoom) // 🔐 protected

// ================= GET ALL ROOMS =================
router.get("/", getAllRooms) // ✅ public

// ================= GET ROOMS BY PG =================
router.get("/pg/:pgId", getRoomsByPg) // ✅ public

// ================= GET ROOMS BY LANDLORD =================
// ⚠️ place BEFORE /:id
router.get("/landlord/:landlordId", validateToken, getRoomsByLandlord)

// ================= GET ROOM BY ID =================
router.get("/:id", getRoomById) // ✅ public

// ================= UPDATE ROOM =================
router.put("/:id", validateToken, updateRoom) // 🔐 protected

// ================= DELETE ROOM =================
router.delete("/:id", validateToken, deleteRoom) // 🔐 protected

module.exports = router