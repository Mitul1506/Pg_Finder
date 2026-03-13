const reportSchema = require("../models/ReportModel")

const createReport = async(req,res)=>{
    try{

        const savedReport = await reportSchema.create(req.body)

        res.status(201).json({
            message:"report created..",
            data:savedReport
        })

    }catch(error){

        res.status(500).json({
            message:"error while creating report",
            err:error
        })

    }
}

const getAllReports = async(req,res)=>{
    try{

        const reports = await reportSchema.find()

        res.status(200).json({
            message:"reports fetched..",
            data:reports
        })

    }catch(error){

        res.status(500).json({
            message:"error while fetching reports",
            err:error
        })

    }
}

module.exports = {
    createReport,
    getAllReports
}