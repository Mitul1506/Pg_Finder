const router = require("express").Router()

const {
createPg,
getAllPgs,
getPgById,
updatePg,
deletePg
} = require("../controllers/PgController")

router.post("/",createPg)

router.get("/",getAllPgs)
router.get("/:id",getPgById)

router.put("/:id",updatePg)
router.delete("/:id",deletePg)

module.exports = router