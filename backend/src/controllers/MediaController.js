const mediaModel = require("../models/MediaModel")
const uploadToCloudinary = require("../utils/CloudinaryUtil")

const uploadImage = async(req,res)=>{

try{

    if(!req.file){
        return res.status(400).json({
            message:"No file uploaded"
        })
    }

    const cloudinaryRes = await uploadToCloudinary(req.file.path)

    const savedMedia = await mediaModel.create({

        fileName:req.file.originalname,
        url:cloudinaryRes.secure_url,
        publicId:cloudinaryRes.public_id,
        uploadedBy:req.body.userId

    })

    res.status(201).json({
        message:"Image uploaded successfully",
        data:savedMedia
    })

}catch(err){

    res.status(500).json({
        message:"Image upload failed",
        error:err.message
    })

}

}



const getAllMedia = async(req,res)=>{

try{

    const media = await mediaModel.find().populate("uploadedBy")

    res.status(200).json({
        message:"Media fetched",
        data:media
    })

}catch(err){

    res.status(500).json({
        message:"Error fetching media",
        error:err.message
    })

}

}


module.exports = {
uploadImage,
getAllMedia
}