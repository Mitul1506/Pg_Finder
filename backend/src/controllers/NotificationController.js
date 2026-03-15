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
const getNotificationById = async(req,res)=>{
    try{

        const notification = await notificationSchema.findById(req.params.id)

        res.status(200).json({
            message:"notification fetched",
            data:notification
        })

    }catch(error){

        res.status(500).json({
            message:"error fetching notification",
            err:error
        })

    }
}

const updateNotification = async(req,res)=>{
    try{

        const notification = await notificationSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.status(200).json({
            message:"notification updated",
            data:notification
        })

    }catch(error){

        res.status(500).json({
            message:"error updating notification",
            err:error
        })

    }
}

const deleteNotification = async(req,res)=>{
    try{

        await notificationSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"notification deleted"
        })

    }catch(error){

        res.status(500).json({
            message:"error deleting notification",
            err:error
        })

    }
}

module.exports={
createNotification,
getAllNotifications,
getNotificationById,
updateNotification,
deleteNotification
}