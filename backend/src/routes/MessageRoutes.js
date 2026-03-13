const router = require("express").Router()

const {
    createMessage,
    getAllMessages
} = require("../controllers/MessageController")

// CREATE MESSAGE
router.post("/",createMessage)

// GET ALL MESSAGES
router.get("/",getAllMessages)

module.exports = router