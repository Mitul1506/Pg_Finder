const pgSchema = require("../models/PgModel")

const createPg = async(req,res)=>{
    try{

        const savedPg = await pgSchema.create(req.body)

        res.status(201).json({
            message:"pg created..",
            data:savedPg
        })

    }catch(error){

        res.status(500).json({
            message:"error while creating pg",
            err:error
        })

    }
}

const getAllPgs = async(req,res)=>{
    try{

        const pgs = await pgSchema.find()

        res.status(200).json({
            message:"pgs fetched..",
            data:pgs
        })

    }catch(error){

        res.status(500).json({
            message:"error while fetching pgs",
            err:error
        })

    }
}

module.exports = {
    createPg,
    getAllPgs
}