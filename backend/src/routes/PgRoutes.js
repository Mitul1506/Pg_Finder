const router = require("express").Router()

const {
    createPg,
    getAllPgs
} = require("../controllers/PgController")

// CREATE PG
router.post("/",createPg)

// GET ALL PG
router.get("/",getAllPgs)

module.exports = router