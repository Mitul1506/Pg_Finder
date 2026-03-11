const Report = require("../models/ReportModel")

exports.createReport = async(req,res)=>{
 try{
  const report = await Report.create(req.body)
  res.json(report)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.getReports = async(req,res)=>{
 try{
  const reports = await Report.find()
  res.json(reports)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}