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
const getReportById = async(req,res)=>{
    try{

        const report = await reportSchema.findById(req.params.id)

        res.status(200).json({
            message:"report fetched",
            data:report
        })

    }catch(error){

        res.status(500).json({
            message:"error fetching report",
            err:error
        })

    }
}

const updateReport = async(req,res)=>{
    try{

        const report = await reportSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.status(200).json({
            message:"report updated",
            data:report
        })

    }catch(error){

        res.status(500).json({
            message:"error updating report",
            err:error
        })

    }
}

const deleteReport = async(req,res)=>{
    try{

        await reportSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"report deleted"
        })

    }catch(error){

        res.status(500).json({
            message:"error deleting report",
            err:error
        })

    }
}

module.exports={
createReport,
getAllReports,
getReportById,
updateReport,
deleteReport
}