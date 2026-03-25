const router = require("express").Router()

const {
createDispute,
getAllDisputes,
getDisputeById,
updateDispute,
deleteDispute,
getDisputeByBookingId
} = require("../controllers/DisputeController")


router.post("/",createDispute)


router.get("/",getAllDisputes)
router.get("/:id",getDisputeById)


router.put("/:id",updateDispute)


router.delete("/:id",deleteDispute)
router.get("/booking/:bookingId", getDisputeByBookingId)

module.exports = router