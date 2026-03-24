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
const getPgById = async(req,res)=>{
    try{

        const pg = await pgSchema.findById(req.params.id)

        res.status(200).json({
            message:"pg fetched",
            data:pg
        })

    }catch(error){

        res.status(500).json({
            message:"error fetching pg",
            err:error
        })

    }
}

const updatePg = async(req,res)=>{
    try{

        const updatedPg = await pgSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.status(200).json({
            message:"pg updated",
            data:updatedPg
        })

    }catch(error){

        res.status(500).json({
            message:"error updating pg",
            err:error
        })

    }
}
const updateMultiplePgs = async (req, res) => {
  try {

    const updates = req.body.pgs; 

    const results = [];

    for (let pg of updates) {
      const updated = await pgSchema.findByIdAndUpdate(
        pg._id,
        { photos: pg.photos },
        { new: true }
      );

      results.push(updated);
    }

    res.status(200).json({
      message: "All PGs updated",
      data: results
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error updating pg",
      err: error.message
    });
  }
};
const deletePg = async(req,res)=>{
    try{

        await pgSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"pg deleted"
        })

    }catch(error){

        res.status(500).json({
            message:"error deleting pg",
            err:error
        })

    }
}
// GET PGs BY LANDLORD
const getPgsByLandlord = async(req,res)=>{
    try{

        const pgs = await pgSchema.find({
            landlordId:req.params.landlordId
        })

        res.status(200).json({
            message:"landlord pgs fetched",
            data:pgs
        })

    }catch(error){

        res.status(500).json({
            message:"error fetching landlord pgs",
            err:error
        })

    }
}

module.exports={
createPg,
getAllPgs,
getPgById,
updatePg,
deletePg,
getPgsByLandlord,
updateMultiplePgs
}