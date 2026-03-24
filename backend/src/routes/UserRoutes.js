const router = require("express").Router()
const validateToken = require("../middleware/AuthMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")
const userController = require("../controllers/UserController")
router.post("/register",userController.registerUser)
router.post("/login", userController.loginUser)
router.post("/forgotpassword",userController.forgotPassword)
router.post("/resetpassword/:token",userController.resetPassword)

router.get("/users", userController.getAllUsers)
router.get("/users/:id", userController.getUserById)
router.delete("/:id", userController.deleteUser)
router.post("/createlandlord", validateToken, roleMiddleware(["admin"]), userController.createLandlord)
module.exports = router