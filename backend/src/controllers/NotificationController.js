const Notification = require("../models/NotificationModel")

exports.createNotification = async(req,res)=>{
 try{
  const notification = await Notification.create(req.body)
  res.json(notification)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}

exports.getNotifications = async(req,res)=>{
 try{
  const notifications = await Notification.find()
  res.json(notifications)
 }catch(err){
  res.status(500).json({error:err.message})
 }
}