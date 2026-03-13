const notificationSchema = require("../models/NotificationModel")

const createNotification = async(req,res)=>{
    try{

        const savedNotification = await notificationSchema.create(req.body)

        res.status(201).json({
            message:"notification created..",
            data:savedNotification
        })

    }catch(error){

        res.status(500).json({
            message:"error while creating notification",
            err:error
        })

    }
}

const getAllNotifications = async(req,res)=>{
    try{

        const notifications = await notificationSchema.find()

        res.status(200).json({
            message:"notifications fetched..",
            data:notifications
        })

    }catch(error){

        res.status(500).json({
            message:"error while fetching notifications",
            err:error
        })

    }
}

module.exports = {
    createNotification,
    getAllNotifications
}