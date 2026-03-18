const Booking = require("../models/BookingModel")
const Room = require("../models/RoomModel")

// CREATE BOOKING
const createBooking = async(req,res)=>{

try{

const {userId,pgId,roomId} = req.body

const room = await Room.findById(roomId)

if(!room){
return res.status(404).json({message:"Room not found"})
}

if(room.availableBeds <= 0){
return res.status(400).json({message:"Room full"})
}

const booking = await Booking.create({
userId,
pgId,
roomId
})

room.availableBeds = room.availableBeds - 1
await room.save()

res.status(201).json({
message:"Room booked",
data:booking
})

}catch(err){

console.log(err)

res.status(500).json({
message:"Booking failed"
})

}

}
// GET USER BOOKINGS
const getUserBookings = async(req,res)=>{

    try{

        const bookings = await Booking.find({userId:req.params.userId})
        .populate("pgId")
        .populate("roomId")

        res.json({
            message:"Bookings fetched",
            data:bookings
        })

    }catch(err){

        res.status(500).json({
            message:"Error fetching bookings",
            error:err.message
        })
    }

}


// CANCEL BOOKING
const cancelBooking = async(req,res)=>{

try{

const booking = await Booking.findById(req.params.id)

if(!booking){
return res.status(404).json({message:"Booking not found"})
}

// ❗ prevent multiple cancel
if(booking.status === "cancelled"){
return res.status(400).json({message:"Already cancelled"})
}

const room = await Room.findById(booking.roomId)

room.availableBeds += 1
await room.save()

booking.status = "cancelled"
await booking.save()

res.json({
message:"Booking cancelled"
})

}catch(err){

res.status(500).json({
message:"Error cancelling booking"
})

}

}
// GET BOOKINGS FOR LANDLORD
const getBookingsByLandlord = async(req,res)=>{
    try{

        const bookings = await Booking.find()
        .populate("roomId")
        .populate("pgId")
        .populate("userId")

        const filtered = bookings.filter(b =>
            b.pgId?.landlordId?.toString() === req.params.landlordId
        )

        res.status(200).json({
            message:"landlord bookings fetched",
            data:filtered
        })

    }catch(err){

        res.status(500).json({
            message:"Error fetching landlord bookings",
            error:err.message
        })

    }
}
module.exports = {
    createBooking,
    getUserBookings,
    cancelBooking,
    getBookingsByLandlord
}