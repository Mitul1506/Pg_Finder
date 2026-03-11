const router = require("express").Router()

const {
  createNotification,
  getNotifications
} = require("../controllers/NotificationController")

// CREATE
router.post("/", createNotification)

// READ
router.get("/", getNotifications)

module.exports = router