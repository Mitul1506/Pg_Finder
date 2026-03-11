const router = require("express").Router()

const {
  createDispute,
  getAllDisputes,
  updateDispute
} = require("../controllers/DisputeController")

// CREATE
router.post("/", createDispute)

// READ
router.get("/", getAllDisputes)

// UPDATE
router.put("/:id", updateDispute)

module.exports = router