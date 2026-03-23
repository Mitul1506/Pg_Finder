const router = require("express").Router()
const userController = require("../controllers/UserController")
router.post("/register",userController.registerUser)
router.post("/login", userController.loginUser)
router.post("/forgotpassword",userController.forgotPassword)
router.post("/resetpassword/:token",userController.resetPassword)
// USERS
router.get("/users", userController.getAllUsers)
router.get("/users/:id", userController.getUserById)
router.delete("/:id", userController.deleteUser)
module.exports = router