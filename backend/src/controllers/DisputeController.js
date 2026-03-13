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

        const disputes = await disputeSchema.find()

        res.status(200).json({
            message:"disputes fetched..",
            data:disputes
        })

    }catch(error){

        res.status(500).json({
            message:"error while fetching disputes",
            err:error
        })

    }
}

module.exports = {
    createDispute,
    getAllDisputes
}