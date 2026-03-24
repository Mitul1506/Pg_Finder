const router = require("express").Router()

const validateToken = require("../middleware/AuthMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

const {
  createPg,
  getAllPgs,
  getPgById,
  updatePg,
  deletePg,
  getPgsByLandlord,
  updateMultiplePgs
} = require("../controllers/PgController")


router.put(
  "/update-multiple",
  validateToken,
  roleMiddleware(["admin", "landlord"]),
  updateMultiplePgs
)


router.post(
  "/",
  validateToken,
  roleMiddleware(["landlord"]),
  createPg
)


router.get("/", getAllPgs)


router.get(
  "/landlord/:landlordId",
  validateToken,
  roleMiddleware(["landlord"]),
  getPgsByLandlord
)


router.get("/:id", getPgById)


router.put(
  "/:id",
  validateToken,
  roleMiddleware(["landlord"]),
  updatePg
)


router.delete(
  "/:id",
  validateToken,
  roleMiddleware(["landlord", "admin"]),
  deletePg
)

module.exports = router