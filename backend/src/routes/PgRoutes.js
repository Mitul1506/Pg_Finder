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

// ================= BULK UPDATE (PUT FIRST 🔥) =================
router.put(
  "/update-multiple",
  validateToken,
  roleMiddleware(["admin", "landlord"]),
  updateMultiplePgs
)

// ================= CREATE PG =================
router.post(
  "/",
  validateToken,
  roleMiddleware(["landlord"]),
  createPg
)

// ================= GET ALL PGs =================
router.get("/", getAllPgs)

// ================= LANDLORD PGs =================
router.get(
  "/landlord/:landlordId",
  validateToken,
  roleMiddleware(["landlord"]),
  getPgsByLandlord
)

// ================= GET PG BY ID =================
router.get("/:id", getPgById)

// ================= UPDATE SINGLE PG =================
router.put(
  "/:id",
  validateToken,
  roleMiddleware(["landlord"]),
  updatePg
)

// ================= DELETE PG =================
router.delete(
  "/:id",
  validateToken,
  roleMiddleware(["landlord", "admin"]),
  deletePg
)

module.exports = router