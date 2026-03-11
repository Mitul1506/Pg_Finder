const router = require("express").Router()

const {
  createPg,
  getAllPg,
  getPgById,
  updatePg,
  deletePg
} = require("../controllers/PgController")

router.post("/", createPg)
router.get("/", getAllPg)
router.get("/:id", getPgById)
router.put("/:id", updatePg)
router.delete("/:id", deletePg)

module.exports = router