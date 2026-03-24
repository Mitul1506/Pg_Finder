const router = require("express").Router()

const {
createReport,
getAllReports,
getReportById,
updateReport,
deleteReport
} = require("../controllers/ReportController")


router.post("/",createReport)


router.get("/",getAllReports)
router.get("/:id",getReportById)


router.put("/:id",updateReport)


router.delete("/:id",deleteReport)

module.exports = router