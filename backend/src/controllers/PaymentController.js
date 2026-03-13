const paymentSchema = require("../models/PaymentModel")

const createPayment = async(req,res)=>{
    try{

        const savedPayment = await paymentSchema.create(req.body)

        res.status(201).json({
            message:"payment created..",
            data:savedPayment
        })

    }catch(error){

        res.status(500).json({
            message:"error while creating payment",
            err:error
        })

    }
}

const getAllPayments = async(req,res)=>{
    try{

        const payments = await paymentSchema.find()

        res.status(200).json({
            message:"payments fetched..",
            data:payments
        })

    }catch(error){

        res.status(500).json({
            message:"error while fetching payments",
            err:error
        })

    }
}

module.exports = {
    createPayment,
    getAllPayments
}