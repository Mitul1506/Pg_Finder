const router = require("express").Router()

const {
  sendMessage,
  getMessages
} = require("../controllers/MessageController")

// SEND MESSAGE
router.post("/", sendMessage)

// GET ALL MESSAGES
router.get("/", getMessages)

module.exports = router