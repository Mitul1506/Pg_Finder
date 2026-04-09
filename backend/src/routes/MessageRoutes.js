const router = require("express").Router()
const {
  sendMessage,
  getMessagesForLandlord,
  replyMessage,
  getMessagesForUser
} = require("../controllers/MessageController")

router.post("/", sendMessage)
router.get("/landlord/:landlordId", getMessagesForLandlord)
router.put("/:id", replyMessage)
router.get("/user/:userId", getMessagesForUser)

module.exports = router