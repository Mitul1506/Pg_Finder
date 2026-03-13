const router = require("express").Router()

const {
    createReport,
    getAllReports
} = require("../controllers/ReportController")

// CREATE REPORT
router.post("/",createReport)

// GET ALL REPORTS
router.get("/",getAllReports)

module.exports = router