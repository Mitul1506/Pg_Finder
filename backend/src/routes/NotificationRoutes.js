const router = require("express").Router()

const {
    createNotification,
    getAllNotifications
} = require("../controllers/NotificationController")

// CREATE NOTIFICATION
router.post("/",createNotification)

// GET ALL NOTIFICATIONS
router.get("/",getAllNotifications)

module.exports = router