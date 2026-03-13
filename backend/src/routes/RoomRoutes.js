const router = require("express").Router()

const {
    createRoom,
    getAllRooms
} = require("../controllers/RoomController")

// CREATE ROOM
router.post("/",createRoom)

// GET ALL ROOMS
router.get("/",getAllRooms)

module.exports = router