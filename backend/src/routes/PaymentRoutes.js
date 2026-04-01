const router = require("express").Router();

const {
  createOrder,
  verifyPayment
} = require("../controllers/PaymentController");

// CREATE ORDER
router.post("/create-order", createOrder);

// VERIFY PAYMENT
router.post("/verify-payment", verifyPayment);

module.exports = router;