const disputeSchema = require("../models/DisputeModel")

const createDispute = async(req,res)=>{
    try{

        const savedDispute = await disputeSchema.create(req.body)

        res.status(201).json({
            message:"dispute created..",
            data:savedDispute
        })

    }catch(error){

        res.status(500).json({
            message:"error while creating dispute",
            err:error
        })

    }
}

const getAllDisputes = async(req,res)=>{
    try{

        const disputes = await disputeSchema
        .find()
        .populate("raisedBy","firstName email")
        .populate("againstUserId","firstName email")
        .populate("bookingId")

        res.status(200).json({
            message:"disputes fetched..",
            data:disputes
        })

    }catch(error){

        console.log(error) // 🔥 ADD THIS (VERY IMPORTANT)

        res.status(500).json({
            message:"error while fetching disputes",
            err:error.message
        })

    }
}
const getDisputeById = async(req,res)=>{
    try{

        const dispute = await disputeSchema.findById(req.params.id)

        res.status(200).json({
            message:"dispute fetched",
            data:dispute
        })

    }catch(error){

        res.status(500).json({
            message:"error fetching dispute",
            err:error
        })

    }
}

const updateDispute = async(req,res)=>{
    try{

        const dispute = await disputeSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.status(200).json({
            message:"dispute updated",
            data:dispute
        })

    }catch(error){

        res.status(500).json({
            message:"error updating dispute",
            err:error
        })

    }
}

const deleteDispute = async(req,res)=>{
    try{

        await disputeSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"dispute deleted"
        })

    }catch(error){

        res.status(500).json({
            message:"error deleting dispute",
            err:error
        })

    }
}
const getDisputeByBookingId = async (req, res) => {
    try {

        const dispute = await disputeSchema
            .findOne({ bookingId: req.params.bookingId })
            .populate("raisedBy", "firstName email")
            .populate("againstUserId", "firstName email")

        res.status(200).json({
            message: "dispute fetched",
            data: dispute
        })

    } catch (error) {

        res.status(500).json({
            message: "error fetching dispute",
            err: error.message
        })

    }
}

module.exports={
createDispute,
getAllDisputes,
getDisputeById,
updateDispute,
deleteDispute,
getDisputeByBookingId
}