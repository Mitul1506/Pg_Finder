const router = require("express").Router()

const {
createRoom,
getAllRooms,
getRoomById,
updateRoom,
deleteRoom,
getRoomsByPg,
getRoomsByLandlord
} = require("../controllers/RoomController")

// CREATE ROOM
router.post("/",createRoom)

// READ
router.get("/",getAllRooms)

// GET ROOMS BY PG
router.get("/pg/:pgId",getRoomsByPg)

router.get("/:id",getRoomById)

// UPDATE
router.put("/:id",updateRoom)

// DELETE
router.delete("/:id",deleteRoom)
router.get("/landlord/:landlordId", getRoomsByLandlord)

module.exports = router