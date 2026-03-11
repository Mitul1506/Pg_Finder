const router = require("express").Router()

const {
  createReport,
  getReports
} = require("../controllers/ReportController")

// CREATE REPORT
router.post("/", createReport)

// GET REPORTS
router.get("/", getReports)

module.exports = router