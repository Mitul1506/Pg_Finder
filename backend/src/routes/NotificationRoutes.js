const router = require("express").Router()

const {
createNotification,
getAllNotifications,
getNotificationById,
updateNotification,
deleteNotification
} = require("../controllers/NotificationController")

// CREATE
router.post("/",createNotification)

// READ
router.get("/",getAllNotifications)
router.get("/:id",getNotificationById)

// UPDATE
router.put("/:id",updateNotification)

// DELETE
router.delete("/:id",deleteNotification)

module.exports = router