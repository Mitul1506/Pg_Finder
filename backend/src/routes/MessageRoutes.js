const router = require("express").Router()

const {
createMessage,
getAllMessages,
getMessageById,
deleteMessage
} = require("../controllers/MessageController")

// CREATE
router.post("/",createMessage)

// READ
router.get("/",getAllMessages)
router.get("/:id",getMessageById)

// DELETE
router.delete("/:id",deleteMessage)

module.exports = router