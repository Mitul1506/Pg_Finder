const router = require("express").Router()

const {
createPg,
getAllPgs,
getPgById,
updatePg,
deletePg,
getPgsByLandlord
} = require("../controllers/PgController")

router.post("/",createPg)

router.get("/",getAllPgs)
router.get("/:id",getPgById)

router.put("/:id",updatePg)
router.delete("/:id",deletePg)
router.get("/landlord/:landlordId", getPgsByLandlord)

module.exports = router