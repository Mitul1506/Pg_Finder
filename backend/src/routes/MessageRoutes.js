const router = require("express").Router()

const {
createMessage,
getAllMessages,
getMessageById,
deleteMessage
} = require("../controllers/MessageController")


router.post("/",createMessage)


router.get("/",getAllMessages)
router.get("/:id",getMessageById)


router.delete("/:id",deleteMessage)

module.exports = router