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


router.post("/", validateToken, createRoom)


router.get("/", getAllRooms) 

router.get("/pg/:pgId", getRoomsByPg)


router.get("/landlord/:landlordId", validateToken, getRoomsByLandlord)


router.get("/:id", getRoomById) 

router.put("/:id", validateToken, updateRoom) 


router.delete("/:id", validateToken, deleteRoom) 

module.exports = router