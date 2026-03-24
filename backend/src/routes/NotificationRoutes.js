const router = require("express").Router()

const {
createNotification,
getAllNotifications,
getNotificationById,
updateNotification,
deleteNotification
} = require("../controllers/NotificationController")


router.post("/",createNotification)


router.get("/",getAllNotifications)
router.get("/:id",getNotificationById)


router.put("/:id",updateNotification)


router.delete("/:id",deleteNotification)

module.exports = router