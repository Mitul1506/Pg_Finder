const router = require("express").Router()

const validateToken = require("../middleware/AuthMiddleware") // ✅ add middleware

const {
  createPg,
  getAllPgs,
  getPgById,
  updatePg,
  deletePg,
  getPgsByLandlord
} = require("../controllers/PgController")

// ================= CREATE PG =================
router.post("/", validateToken, createPg) // 🔐 protected

// ================= GET ALL PGs =================
router.get("/", getAllPgs) // ✅ public (users can browse)

// ================= LANDLORD PGs =================
// ⚠️ must come BEFORE /:id
router.get("/landlord/:landlordId", validateToken, getPgsByLandlord)

// ================= GET PG BY ID =================
router.get("/:id", getPgById) // ✅ public

// ================= UPDATE PG =================
router.put("/:id", validateToken, updatePg) // 🔐 protected

// ================= DELETE PG =================
router.delete("/:id", validateToken, deletePg) // 🔐 protected

module.exports = router