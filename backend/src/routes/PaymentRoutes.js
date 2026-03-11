const router = require("express").Router()

const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} = require("../controllers/PaymentController")

// CREATE
router.post("/", createPayment)

// READ
router.get("/", getAllPayments)
router.get("/:id", getPaymentById)

// UPDATE
router.put("/:id", updatePayment)

// DELETE
router.delete("/:id", deletePayment)

module.exports = router