const router = require("express").Router()

const {
createDispute,
getAllDisputes,
getDisputeById,
updateDispute,
deleteDispute
} = require("../controllers/DisputeController")

// CREATE
router.post("/",createDispute)

// READ
router.get("/",getAllDisputes)
router.get("/:id",getDisputeById)

// UPDATE
router.put("/:id",updateDispute)

// DELETE
router.delete("/:id",deleteDispute)

module.exports = router