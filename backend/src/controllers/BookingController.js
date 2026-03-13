const bookingSchema = require("../models/BookingModel")

const createBooking = async(req,res)=>{
    try{

        const savedBooking = await bookingSchema.create(req.body)

        res.status(201).json({
            message:"booking created..",
            data:savedBooking
        })

    }catch(error){

        res.status(500).json({
            message:"error while creating booking",
            err:error
        })

    }
}

const getAllBookings = async(req,res)=>{
    try{

        const bookings = await bookingSchema.find()

        res.status(200).json({
            message:"bookings fetched..",
            data:bookings
        })

    }catch(error){

        res.status(500).json({
            message:"error while fetching bookings",
            err:error
        })

    }
}

module.exports = {
    createBooking,
    getAllBookings
}