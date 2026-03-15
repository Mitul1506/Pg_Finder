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
const getPaymentById = async(req,res)=>{
    try{

        const payment = await paymentSchema.findById(req.params.id)

        res.status(200).json({
            message:"payment fetched",
            data:payment
        })

    }catch(error){

        res.status(500).json({
            message:"error fetching payment",
            err:error
        })

    }
}

const updatePayment = async(req,res)=>{
    try{

        const payment = await paymentSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.status(200).json({
            message:"payment updated",
            data:payment
        })

    }catch(error){

        res.status(500).json({
            message:"error updating payment",
            err:error
        })

    }
}

const deletePayment = async(req,res)=>{
    try{

        await paymentSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"payment deleted"
        })

    }catch(error){

        res.status(500).json({
            message:"error deleting payment",
            err:error
        })

    }
}

module.exports={
createPayment,
getAllPayments,
getPaymentById,
updatePayment,
deletePayment
}