const router = require("express").Router()

const {
    createDispute,
    getAllDisputes
} = require("../controllers/DisputeController")

// CREATE DISPUTE
router.post("/",createDispute)

// GET ALL DISPUTES
router.get("/",getAllDisputes)

module.exports = router