const router = require("express").Router()

const {
createReport,
getAllReports,
getReportById,
updateReport,
deleteReport
} = require("../controllers/ReportController")

// CREATE
router.post("/",createReport)

// READ
router.get("/",getAllReports)
router.get("/:id",getReportById)

// UPDATE
router.put("/:id",updateReport)

// DELETE
router.delete("/:id",deleteReport)

module.exports = router