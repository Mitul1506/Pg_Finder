const router = require("express").Router()
const validateToken = require("../middleware/AuthMiddleware")

const {
createPayment,
getAllPayments,
getPaymentById,
updatePayment,
deletePayment
} = require("../controllers/PaymentController")


router.post("/",createPayment)


router.get("/",getAllPayments)
router.get("/:id",getPaymentById)


router.put("/:id",updatePayment)


router.delete("/:id",deletePayment)

module.exports = router