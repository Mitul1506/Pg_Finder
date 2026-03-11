const router = require("express").Router()

const {
createRoom,
getAllRooms,
getRoomById,
updateRoom,
deleteRoom
} = require("../controllers/RoomController")

router.post("/",createRoom)
router.get("/",getAllRooms)
router.get("/:id",getRoomById)
router.put("/:id",updateRoom)
router.delete("/:id",deleteRoom)

module.exports = router